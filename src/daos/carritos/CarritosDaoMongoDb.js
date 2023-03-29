import ContenedorMongoDb from "../../container/ContenedorMongoDb.js"
import cartSchema from "../../models/cartSchema.js"

class CarritosDaoMongoDb extends ContenedorMongoDb {
    constructor () {
        super(cartSchema)
    }
}

export default CarritosDaoMongoDb