import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    total: { type: Number , required: true },
    productos: { type: [], required: true },
    user: {type: String, required: true}
})

export default mongoose.model("carritos", cartSchema)