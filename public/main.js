const socket = io.connect()

const addProduct = () =>{
    const nombre = document.getElementById('nombre').value
    const precio = document.getElementById('precio').value
    const foto = document.getElementById('foto').value

    const newProduct = {
        productName: nombre,
        productPrice: precio,
        productPhoto: foto
    }
    socket.emit('new-product', newProduct)

    return false
}

const renderProducts = (data) => {
    const html = data.map(product => {
        return (`<tr><td><strong>${product.productName}</strong></td> <td><em>$${product.productPrice}</em></td> <td><img src="${product.productPhoto}"></td></tr>`)
    }).join(' ')

    document.getElementById('productos').innerHTML = html
}

const renderMessages = (data) => {
    const html = data.map(item => {
        return (`<div><strong>${item.user}</strong><span>${new Date().toLocaleDateString('es-ES')} ${new Date().toLocaleTimeString()}</span> : <em>${item.message}</em></div>`)
    }).join(' ')

    document.getElementById('mensajes').innerHTML = html
}

const addMessage = () =>{
    const user = document.getElementById('user').value
    const text = document.getElementById('message').value

    const message = {
        user: user,
        message: text
    }

    document.getElementById('message').value = ''

    socket.emit('new-message', message)

    return false
}

socket.on('message', data => {
    renderMessages(data)
})


socket.on('Products', data => {
    renderProducts(data)
})