import express from 'express'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import cluster from 'cluster'
import os from 'os'

import compression from 'compression'

import { logInfo, logWarning } from './src/loggers/index.js'

import foreverArgvConfig from './src/config/foreverArgvConfig.js'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import authWebRouter from './src/routers/web/auth.js'
import homeWebRouter from './src/routers/web/home.js'
import productsApiRouter from './src/routers/api/products.js'
import infoWebRouter from './src/routers/web/info.js'
import randomsApiRouter from './src/routers/api/randomsApiRouter.js'

import addProductsHandlers from './src/routers/ws/products.js'
import addMessagessHandlers from './src/routers/ws/messages.js'

import utilsSession from './src/services/utilsSession.js'

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

app.use(passport.initialize())

//Socket config
io.on('connection', async (socket) => {
    console.log('Nuevo cliente conectado!')
    addProductsHandlers(socket, io.sockets)
    addMessagessHandlers(socket, io.sockets)
})

//Server config
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(cookieParser())
app.use(utilsSession.createOnMongoStore())

app.use(passport.initialize())
app.use(passport.session())

app.use(compression())

app.use((req, res, next) =>{
    logInfo(`${req.method} ${req.url}`)
    next()
})

app.use('*', (req, res, next) =>{
    logWarning(`${req.method} ${req.originalUrl} - Ruta Inexistente`)
    next()
})

import auth from './src/routers/web/auth.js'
const sessions = auth
app.use('/api/sessions', sessions)

//Api routes
app.use(productsApiRouter)

//Web routes
app.use(authWebRouter)
app.use(homeWebRouter)
app.use(infoWebRouter)
app.use(randomsApiRouter)

//Server init
const numCPUs = os.cpus().length
const forkMode = foreverArgvConfig.mode !== 'cluster'
if (forkMode) {
    const connectedServer = httpServer.listen(foreverArgvConfig.PORT, () => {
        console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
    })
    connectedServer.on('error', (error) => console.log(`Error en servidor ${error}`))
} else {
    if (foreverArgvConfig.mode == 'cluster' && cluster.isPrimary) {
        console.log(`Master cluster setting up ${numCPUs} workers...`)
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork()
        }
        cluster.on('online', (worker) => {
            console.log(`Worker ${worker.process.pid} is online`)
        })
        cluster.on('exit', (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`)
            console.log('Starting a new worker')
            cluster.fork()
        })
    } else {
        const connectedServer = httpServer.listen(foreverArgvConfig.PORT, () => {
            console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
        })
        connectedServer.on('error', (error) => console.log(`Error en servidor ${error}`))
    }
}
