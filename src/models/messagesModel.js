import mongoose from 'mongoose'

const mensajesSchema = new mongoose.Schema({
    author: {
        id: { type: String, required: true },
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        edad: { type: String, required: true },
        alias: { type: String, required: true },
        avatar: { type: String, required: true },
    },
    text: { type: String, required: true },
    date: { type: String, required: true }
})

export default mongoose.model('mensajes', mensajesSchema)