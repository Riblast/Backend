import OrdenesDaoMongoDb from './ordenes/ordenesDaoMongoDb.js'

let productosDao
let carritosDao
let mensajesDao
let usuariosDao
let ordenesDao

switch ('mongoDb') {
  case 'mongodb':
    const { default: ProductosDaoMongoDb } = await import('./productos/ProductosDaoMongoDb.js')
    const { default: CarritosDaoMongoDb } = await import('./carritos/CarritosDaoMongoDb.js')
    const { default: UsuariosDaoMongoDb } = await import('./usuarios/UsuariosDaoMongoDb.js')
    const { default: MensajesDaoMongoDb } = await import('./mensajes/MensajesDaoMongoDb.js')
    const { default: ordenesDaoMongoDb } = await import('./ordenes/OrdenesDaoMongoDb.js')

    productosDao = new ProductosDaoMongoDb()
    carritosDao = new CarritosDaoMongoDb()
    usuariosDao = new UsuariosDaoMongoDb()
    mensajesDao = new MensajesDaoMongoDb()
    ordenesDao = new OrdenesDaoMongoDb()
    break
}

export { productosDao, carritosDao, mensajesDao, usuariosDao, ordenesDao }
