import ContenedorMongoDb from '../../container/ContenedorMongoDb.js'
import orderSchema from '../../models/orderSchema.js'

class OrdenesDaoMongoDb extends ContenedorMongoDb {
  constructor () {
    super(orderSchema)
  }

  async countOrders () {
    return await this.collection.countDocuments()
  }
}

export default OrdenesDaoMongoDb
