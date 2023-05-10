let productosDao
let carritosDao
let mensajesDao
let usuariosDao
let ordenesDao

switch ('mongoDb') {
  case 'mongoDb':
    const { default: ProductosDaoMongoDb } = await import('./productos/ProductosDaoMongoDb.js')
    productosDao = new ProductosDaoMongoDb()

    const { default: CarritosDaoMongoDb } = await import('./carritos/CarritosDaoMongoDb.js')
    carritosDao = new CarritosDaoMongoDb()

    const { default: UsuariosDaoMongoDb } = await import('./usuarios/UsuariosDaoMongoDb.js')
    usuariosDao = new UsuariosDaoMongoDb()

    const { default: MensajesDaoMongoDb } = await import('./mensajes/MensajesDaoMongoDb.js')
    mensajesDao = new MensajesDaoMongoDb()

    const { default: OrdenesDaoMongoDb } = await import('./ordenes/OrdenesDaoMongoDb.js')
    ordenesDao = new OrdenesDaoMongoDb()
}

export { productosDao, carritosDao, mensajesDao, usuariosDao, ordenesDao }
