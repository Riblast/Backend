import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
  total: { type: Number, required: true },
  productos: [{
    id: { type: String, required: true },
    cantidad: { type: Number, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true }
  }],
  user: { type: String, required: true },
  address: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
})

export default mongoose.model('carritos', cartSchema)
