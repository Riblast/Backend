import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  price: { type: Number },
  title: { type: String },
  description: { type: String },
  thumbnail: { type: String },
  category: { type: String }
})

export default mongoose.model('productos', productSchema)
