import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    price: {type: Number, required: true},
    title: {type: String, required: true},
    thumbnail: {type: String, required: true}
})

export default mongoose.model("productos", productSchema)