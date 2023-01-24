import productsApi from '../../api/products.js'

export default async function configurarSocket(socket, sockets) {
    socket.emit('server: loadProducts', await productsApi.getAll())

    socket.on('client: newProduct', async product => {
        await productsApi.save(product)
        sockets.emit('products', await productsApi.getAll())
    })
}