import ContenedorMongoDb from '../../container/ContenedorMongoDb.js'
import messageSchema from '../../models/messageSchema.js'

class MensajesDaoMongoDb extends ContenedorMongoDb {
  constructor () {
    super(messageSchema)
  }

  async getMensajesByUser (email) {
    const mensajes = await this.collection.find({ user: email }).exec()
    return mensajes
  }
}

export default MensajesDaoMongoDb
