import ContenedorMongoDb from "../../container/ContenedorMongoDb.js";

class CarritosDaoMongoDb extends ContenedorMongoDb {
    constructor () {
        super('carritos', {
            total: { type: Number , required: true },
            productos: { type: [], required: true },
            user: {type: String, required: true}
        })
    }
}

export default CarritosDaoMongoDb