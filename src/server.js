import express from 'express'
import productsRouter from './routes/productsRouter.js'
import cartsRouter from './routes/cartsRouter.js'


const app = express()
const PORT = 8080 || process.env.PORT


app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static('public'))

app.get('/')

app.use('/api/productos', productsRouter)
app.use('/api/carrito', cartsRouter)

const server = app.listen(PORT, () => {
    console.log(`Servidor http abierto en el puerto ${PORT}`)
})

server.on('error', error => console.log('error en el servidor', error))