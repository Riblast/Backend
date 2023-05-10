import ContenedorMongoDb from '../../container/ContenedorMongoDb.js'
import userSchema from '../../models/userSchema.js'

class UsuariosDaoMongoDb extends ContenedorMongoDb {
  constructor () {
    super(userSchema)
  }
}

export default UsuariosDaoMongoDb
