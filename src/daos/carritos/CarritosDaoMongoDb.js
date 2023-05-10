import ContenedorMongoDb from '../../container/ContenedorMongoDb.js'
import cartSchema from '../../models/cartSchema.js'
import transformMongoObject from '../../utils/objectUtils.js'
import CustomError from '../../classes/CustomErrorClass.js'

class CarritosDaoMongoDb extends ContenedorMongoDb {
  constructor () {
    super(cartSchema)
  }

  async findByUser (user) {
    try {
      const res = await this.collection.findOne({ user })
      return transformMongoObject(res)
    } catch (error) {
      const objError = new CustomError(500, 'Error listar()', error)
      throw objError
    }
  }

  async actualizar (miCarrito) {
    console.log(miCarrito.id)
    return this.collection.replaceOne({ _id: miCarrito.id }, miCarrito)
  }

  async guardar (elemento) {
    try {
      const res = await this.collection.create(elemento)
      return transformMongoObject(res)
    } catch (error) {
      const objError = new CustomError(500, 'Error guardar()', error)
      throw objError
    }
  }
}

export default CarritosDaoMongoDb
