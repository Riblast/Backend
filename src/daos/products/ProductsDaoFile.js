import FileContainer from '../../containers/FileContainer.js'

class ProductsDaoFile extends FileContainer {
    constructor(){
        super('products.json')
    }
}

export default ProductsDaoFile