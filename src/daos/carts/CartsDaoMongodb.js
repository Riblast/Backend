import MongodbContainer from '../../containers/MongodbContainer.js'

class CartsDaoMongodb extends MongodbContainer {
    constructor() {
        super('carts', { products: { type: [], required: true}})
    }
    async save(cart = { products: []}) {
        return super.save(cart)
    }
    async updateById(id, item) {
        await this.collection.updateOne({'_id': id },{
            $push: { products: item }
        })
    }
}

export default CartsDaoMongodb