import MongodbContainer from '../../containers/MongodbContainer.js'

class CartsDaoMongodb extends MongodbContainer {
    constructor() {
        super('carts', { products: { type: [], required: true}})
    }
    async save(cart = { products: []}) {
        return super.save(cart)
    }
}

export default CartsDaoMongodb