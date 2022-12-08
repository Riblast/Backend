const app = require('./server')


PORT = process.env.PORT||8080
const server = app.listen(PORT, ()=>{
    console.log(`servidor abierto en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en el servidor ${error}`))