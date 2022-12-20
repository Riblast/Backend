import express from 'express'
import {Server as HttpServer} from 'http'
import {Server as IO} from 'socket.io'

import FileContainer from './src/containers/fileContainer.js'
const productsContainer = new FileContainer("products")
const messageContainer = new FileContainer("messages")

const app = express()
const httpServer = new HttpServer(app)
const io = new IO(httpServer)
const PORT = 8080 || process.env.PORT


io.on('connection', socket => {
    console.log('nuevo usuario conectado');

    const emitMessages = async () =>{
        const messages = await messageContainer.getAll()
        io.emit('server: loadMessages', messages)
    }
    emitMessages()

    socket.on('client: newMessage', async data => {
        await messageContainer.save(data)
    })

    const emitProducts = async () =>{
        const products = await productsContainer.getAll()
        io.emit('server: loadProducts', products)
    }
    emitProducts()

    socket.on('client: newProduct', async data => {
        await productsContainer.save(data)
    })

})

app.use(express.static('public'))

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http abierto en el puerto ${PORT}`)
})

server.on('error', error => console.log('error en el servidor', error))