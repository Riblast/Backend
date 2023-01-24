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
    socket.emit('client: newProduct', newProduct)

    return false
}

const renderProducts = (data) => {
    const html = data.map(product => {
        return (`<tr><td><strong>${product.productName}</strong></td> <td><em>$${product.productPrice}</em></td> <td><img src="${product.productPhoto}" height="35px"></td></tr>`)
    }).join(' ')
    document.getElementById('productos').innerHTML = html
}

const authorSchema = new normalizr.schema.Entity('authors', {}, {idAttribute: 'email'})
const textSchema = new normalizr.schema.Entity('text')
const messagesSchema = new normalizr.schema.Entity('messages', {author: authorSchema, text: [textSchema]})

const renderMessages = (data) => {
    const html = data.map(message => {
        return (`<div><img src="${message.author.avatar}" height="30px"><span>${message.author.email}</span><strong>${message.author.name} ${message.author.lastName}</strong><span>${new Date().toLocaleDateString('es-ES')} ${new Date().toLocaleTimeString()}</span> : <em>${message.text}</em></div>`)
    }).join(' ')

    document.getElementById('mensajes').innerHTML = html
}

const addMessage = () =>{
    const email = document.getElementById('email').value
    const text = document.getElementById('message').value
    const name = document.getElementById('name').value
    const lastName = document.getElementById('lastName').value
    const age = document.getElementById('age').value
    const username = document.getElementById('username').value
    const avatar = document.getElementById('avatar').value

    const newMessage = {
        author: {
            email: email,
            name: name,
            lastName: lastName,
            age: age,
            username: username,
            avatar: avatar
        },
        text: text
        
    }

    document.getElementById('message').value = ''

    socket.emit('client: newMessage', newMessage)

    return false
}

socket.on('server: loadMessages', data => {
    let denormalizedMessage = normalizr.denormalize(data.result, [messagesSchema], data.entities)
    
    let normalizedMessageSize = JSON.stringify(data).length
    console.log(data, normalizedMessageSize)
    let denormalizedMessageSize = JSON.stringify(denormalizedMessage).length
    console.log(denormalizedMessage, denormalizedMessageSize)

    let compressionPercentage = parseInt((normalizedMessageSize * 100) / denormalizedMessageSize)
    document.getElementById('compresionStatus').innerText = compressionPercentage
    renderMessages(denormalizedMessage)
})





socket.on('server: loadProducts', data => {
    renderProducts(data)
})