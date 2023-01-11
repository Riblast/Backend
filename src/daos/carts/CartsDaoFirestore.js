import FirebaseContainer from '../../containers/FirebaseContainer.js'

class CartsDaoFirebase extends FirebaseContainer {
    constructor(){
        super('Carts')
    }
    async save(cart = {productos: []}) {
        return super.save(cart)
    }    
}

export default CartsDaoFirebase