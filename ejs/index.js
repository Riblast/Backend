
const express = require('express')
const router = require('./src/routes/router')
const mainRoute = require('./src/routes/main')

const path = require('path')

const app = express()
const PORT = 8080 || process.env.PORT

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({extended: true})); 

app.use('/', mainRoute)
app.use('/productos', router)

const server = app.listen(PORT, () => { 
    console.log(`server iniciado en puerto ${PORT}`)
})

server.on('error', error => console.log('error en el servidor', error))