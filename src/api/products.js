import config from '../config/databaseConfig.js'

import FileContainer from '../services/FileContainer.js'

const ProductsApi = new FileContainer(`${config.fileSystem.path}/products.json`)

export default ProductsApi