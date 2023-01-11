import FileContainer from '../../containers/FileContainer.js'

class CartsDaoFile extends FileContainer {
    constructor(){
        super('carts.json')
    }
    async save(cart = { products: []}) {
        return super.save(cart)
    }
}
export default CartsDaoFile