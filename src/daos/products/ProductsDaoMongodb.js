import MongodbContainer from '../../containers/MongodbContainer.js'

class ProductsDaoMongodb extends MongodbContainer {
    constructor() {
        super('products', {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            description: { type: String, required: true },
            thumbnail: { type: String, required: true },
            stock: { type: Number, required: true }
        })
    }
}


export default ProductsDaoMongodb