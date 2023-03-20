
let productosDao
let carritosDao = ''
let mensajesDao
let usuariosDao

switch (/* process.env.PERS */'mongoDb') {

    case 'mongoDb':
        const {default: ProductosDaoMongoDb} = await import ('./productos/ProductosDaoMongoDb.js')
        productosDao = new ProductosDaoMongoDb()

        const { default: CarritosDaoMongoDb } = await import ('./carritos/CarritosDaoMongoDb.js')
        carritosDao = new CarritosDaoMongoDb()

        /* const { default: MensajesDaoMongoDb } = await import ('./mensajes/MensajesDaoMongoDb.js')
        mensajesDao = new MensajesDaoMongoDb() */

        const { default: UsuariosDaoMongoDb } = await import ('./usuarios/UsuariosDaoMongoDb.js')
        usuariosDao = new UsuariosDaoMongoDb()
}

export {productosDao, carritosDao, mensajesDao, usuariosDao }

