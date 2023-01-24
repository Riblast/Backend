import messagesApi from '../../api/messages.js'
import { normalizeMessages } from '../../normalize/index.js'

export default async function socketConfig(socket, sockets) {
    socket.emit('server: loadMessages', normalizeMessages(await messagesApi.getAll()))

    socket.on('client: newMessage', async messages => {
        messages.date = new Date().toLocaleString()
        await messagesApi.save(messages)
        sockets.emit('messages', normalizeMessages(await messagesApi.getAll()))
    })
}