import messagesApi from '../../api/messages.js'
import { normalizeMessages } from '../../normalize/index.js'
import { logError } from '../../loggers/index.js'

export default async function socketConfig(socket, sockets) {
    try {
        socket.emit('server: loadMessages', normalizeMessages(await messagesApi.getAll()))
    } catch (error) {
        logError(error.message)
        return []
    }

    socket.on('client: newMessage', async messages => {
        messages.date = new Date().toLocaleString()
        try {
            await messagesApi.save(messages)
        } catch (error) {
            logError(`error al guardar producto: ${error.message}`)
        }
        sockets.emit('messages', normalizeMessages(await messagesApi.getAll()))
    })
}