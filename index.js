
const express = require('express')
const router = require('./router')

const app = express()
const PORT = 8080 || process.env.PORT


app.use(express.urlencoded({extended: true})); 
app.use(express.json())

app.use(express.static('public'))
app.use('/api/productos', router)

const server = app.listen(PORT, () => { 
    console.log(`server iniciado en puerto ${PORT}`)
})

server.on('error', error => console.log('error en el servidor', error))