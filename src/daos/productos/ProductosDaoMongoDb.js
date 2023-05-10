import ContenedorMongoDb from '../../container/ContenedorMongoDb.js'
import productSchema from '../../models/productSchema.js'
import CustomError from '../../classes/CustomErrorClass.js'
import transformMongoObject from '../../utils/objectUtils.js'
import { logger } from '../../utils/logger.js'

class ProductosDaoMongoDb extends ContenedorMongoDb {
  constructor () {
    super(productSchema)
  }

  async findByCategory (categoryName) {
    try {
      const res = await this.collection.find({ category: categoryName })
      return transformMongoObject(res)
    } catch (error) {
      const objError = new CustomError(500, 'Error findByCategory()', error)
      logger.error(objError)
      throw objError
    }
  }
}

export default ProductosDaoMongoDb
