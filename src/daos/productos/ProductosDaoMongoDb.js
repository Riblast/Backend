import ContenedorMongoDb from "../../container/ContenedorMongoDb.js";


class ProductosDaoMongoDb extends ContenedorMongoDb{
    constructor(){
        super('Productos', {
            price: {type: Number, required: true},
            title: {type: String, required: true},
            thumbnail: {type: String, required: true}
        })
    }
}

export default ProductosDaoMongoDb