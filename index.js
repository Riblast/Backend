const Contenedor = require('./Clase')
const express = require('express')

const app = express()

const PORT = 8080 || process.env.PORT

const productos = new Contenedor('./productos.json')

app.get('/', (req, res) => {
    res.send(`<h1>Home</h1>`)
})

app.get('/productos', async (req, res) => {

    const prods = await productos.getAll()

    res.send({productos: prods})
})

app.get('/productoRandom', async (req, res) => {
    
    const prods = await productos.getAll()
    const randomProd = parseInt(Math.random() * prods.length)
    
    res.send({producto: prods[randomProd]})
})

const server = app.listen(PORT, () => {
    console.log(`server iniciado en puerto ${PORT}`)
})

server.on('error', error => console.log('error en el servidor', error))