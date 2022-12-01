const express = require('express')
const {Server: HttpServer} = require('http')
const {Server: IO} = require('socket.io')


const app = express()
const httpServer = new HttpServer(app)
const io = new IO(httpServer)
const PORT = 8080 || process.env.PORT

const messages = [

]
const products = [

]

io.on('connection', socket => {
    console.log('nuevo usuario conectado');

    socket.emit('message', messages)

    socket.on('new-message', data => {
        messages.push(data)

        io.sockets.emit('message', messages)
    })
    socket.emit('Products', products)

    socket.on('new-product', data => {
        products.push(data)

        io.sockets.emit('Products', products)
    })

})

app.use(express.static('public'))

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http abierto en el puerto ${PORT}`)
})

server.on('error', error => console.log('error en el servidor', error))