import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  total: { type: Number, required: true },
  productos: [{
    id: { type: String, required: true },
    cantidad: { type: Number, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true }
  }],
  user: { type: String, required: true },
  orderNumber: { type: String, required: true },
  state: { type: String, required: true, default: 'generada' },
  timestamp: { type: Date, default: Date.now }
})

export default mongoose.model('ordenes', orderSchema)
