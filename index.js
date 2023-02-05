import express from 'express'
import cookieParser from 'cookie-parser'
import passport from 'passport'

import config from './src/config/databaseConfig.js'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import authWebRouter from './src/routers/web/auth.js'
import homeWebRouter from './src/routers/web/home.js'
import productsApiRouter from './src/routers/api/products.js'

import addProductsHandlers from './src/routers/ws/products.js'
import addMessagessHandlers from './src/routers/ws/messages.js'

import utilsSession from './src/services/utilsSession.js'

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

app.use(passport.initialize())

//Socket config
io.on('connection', async socket => {
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

import auth from './src/routers/web/auth.js'
const sessions = auth
app.use('/api/sessions', sessions)

//Api routes
app.use(productsApiRouter)

//Web routes
app.use(authWebRouter)
app.use(homeWebRouter)

//Server init
const connectedServer = httpServer.listen(config.PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))