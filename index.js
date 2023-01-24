import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'

import config from './src/config.js'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import authWebRouter from './src/routers/web/auth.js'
import homeWebRouter from './src/routers/web/home.js'
import productsApiRouter from './src/routers/api/products.js'

import addProductosHandlers from './src/routers/ws/products.js'
import addMensajesHandlers from './src/routers/ws/messages.js'

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

//Socket config
io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!')
    addProductosHandlers(socket, io.sockets)
    addMensajesHandlers(socket, io.sockets)
})

//Server config
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(session({
    store: MongoStore.create({ mongoUrl: config.mongoRemote.cnxStr }),
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
}))

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