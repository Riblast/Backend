import FirebaseContainer from '../../containers/FirebaseContainer.js'

class ProductsDaoFirebase extends FirebaseContainer {
    constructor(){
        super('Products')
    }
}

export default ProductsDaoFirebase