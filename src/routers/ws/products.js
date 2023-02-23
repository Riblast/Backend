import productsApi from '../../api/products.js'
import { logError } from '../../loggers/index.js'

export default async function configurarSocket(socket, sockets) {
    try {
        socket.emit('server: loadProducts', await productsApi.getAll())
    } catch (error) {
        logError(error.message)
        return []
    }

    socket.on('client: newProduct', async product => {
        try {
            await productsApi.save(product)
        } catch (error) {
            logError(`error al guardar producto: ${error.message}`)
        }
        sockets.emit('products', await productsApi.getAll())
    })
}