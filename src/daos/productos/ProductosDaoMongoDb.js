import ContenedorMongoDb from "../../container/ContenedorMongoDb.js"
import productSchema from "../../models/productSchema.js"

class ProductosDaoMongoDb extends ContenedorMongoDb{
    constructor(){
        super(productSchema)
    }
}

export default ProductosDaoMongoDb