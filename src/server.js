const express = require('express')

const productsRouter = require('./routes/productsRouter')
const cartsRouter = require('./routes/cartRouter')

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/productos', productsRouter)
app.use('/api/carrito', cartsRouter)
app.get('*', (req, res) =>{
    res.send({ staturs:'error', description:`ruta ${req.url} método ${req.method} no implementada`}
    )
})

module.exports = app