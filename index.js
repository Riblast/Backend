import express from 'express'
import {Server as HttpServer} from 'http'
import {Server as IO} from 'socket.io'

import { faker } from '@faker-js/faker'
faker.locale = 'es'

import { normalize, schema } from 'normalizr'

import FileContainer from './src/containers/FileContainer.js'
import { Router } from 'express'

const productsContainer = new FileContainer("./DB/products.json")
const messageContainer = new FileContainer("./DB/messages.json")

const authorSchema = new schema.Entity('authors', {}, {idAttribute: 'email'})
const textSchema = new schema.Entity('text')
const messagesSchema = new schema.Entity('messages', {author: authorSchema, text: [textSchema]})

const normalizeMessages = (message) =>{
    normalize(message, [messagesSchema])
}

const getNormalizedMessages = async () =>{
    const messages = await messageContainer.getAll()
    const normalizedMessages = normalizeMessages(messages)
    console.log(messages)
    console.log(normalizedMessages)
    return normalizedMessages
}

const productsRouterTest = new Router()

const app = express()
const httpServer = new HttpServer(app)
const io = new IO(httpServer)
const PORT = 8080 || process.env.PORT


io.on('connection', socket => {
    console.log('nuevo usuario conectado');

    const emitMessages = async () =>{
        const messages = await getNormalizedMessages()
        socket.emit('server: loadMessages', messages)
    }
    emitMessages()

    socket.on('client: newMessage',  data => {
        messageContainer.save(data)
        getNormalizedMessages().then((res)=>{
            io.sockets.emit('messages', res)
        })
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

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))
app.use('/api/productos-test', productsRouterTest)

const randomGenerator = () =>{
    return {
        name: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl()
    }
}

productsRouterTest.get('/', async (req, res) =>{
    const randomProds = []
    
    for (let i = 0; i < 5; i++) {
        randomProds.push(randomGenerator())
    }
    res.json(randomProds)
})

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http abierto en el puerto ${PORT}`)
})

server.on('error', error => console.log('error en el servidor', error))