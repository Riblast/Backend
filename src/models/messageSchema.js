import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
  replies: {
    type: [{
      user: { type: String },
      message: { type: String },
      timestamp: { type: Date, default: Date.now }
    }]
  },
  timestamp: { type: Date, default: Date.now }
})

export default mongoose.model('mensajes', messageSchema)
