import { Server as SocketServer } from 'socket.io'
import { mensajesDao } from '../daos/index.js'
import getData from '../utils/userInfo.js'
const io = new SocketServer()

const renderChat = async (req, res) => {
  if (req.isAuthenticated()) {
    const data = await getData(req, res)
    if (req.user.isAdmin) {
      const mensajes = await mensajesDao.listarAll()
      // Renderizar la vista de mensajes de chat para los administradores
      res.render('pages/admin/chat', {
        nombre: data.nombre,
        edad: data.edad,
        direccion: data.direccion,
        phone: data.phone,
        email: data.email,
        photo: data.photo,
        messages: mensajes,
        active: 'chat'
      })
    } else {
      const mensajes = await mensajesDao.getMensajesByUser(data.email)
      res.render('pages/chat', {
        nombre: data.nombre,
        edad: data.edad,
        direccion: data.direccion,
        phone: data.phone,
        email: data.email,
        photo: data.photo,
        messages: mensajes,
        active: 'chat'
      })
    }
  } else {
    res.redirect('/login')
  }
}

const renderUserMessages = async (req, res) => {
  if (req.isAuthenticated()) {
    const data = await getData(req, res)
    const emailParam = req.params.email
    const mensajes = await mensajesDao.getMensajesByUser(emailParam)
    res.render('pages/userMessages', {
      messages: mensajes,
      nombre: data.nombre,
      edad: data.edad,
      direccion: data.direccion,
      phone: data.phone,
      email: data.email,
      photo: data.photo,
      active: 'userMessages'
    })
  } else {
    res.redirect('/login')
  }
}

const startSocketServer = (httpServer) => {
  io.listen(httpServer)
  io.on('connection', (socket) => {
    console.log(`Nuevo usuario conectado: ${socket.id}`)

    socket.on('new-message', async (message) => {
      try {
        await mensajesDao.guardar(message)
        io.emit('message', message)
        socket.emit('message', message)
      } catch (error) {
        console.error('Error al guardar mensaje: ', error)
      }
      console.log(`Nuevo mensaje recibido: ${JSON.stringify(message)}`)
    })

    socket.on('new-reply', async ({ messageId, reply }) => {
      try {
        const message = await mensajesDao.listar(messageId)
        message.replies.push({
          user: reply.user,
          message: reply.message,
          timestamp: new Date()
        })
        await mensajesDao.actualizar(messageId, message)
        io.emit('message', message)
        socket.emit('message', message)
        console.log(`Nueva respuesta recibida: ${JSON.stringify(reply)}`)
      } catch (error) {
        console.error('Error al guardar respuesta: ', error)
      }
    })
  })
}

export { renderChat, renderUserMessages, startSocketServer }
