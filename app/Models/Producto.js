'use strict'

/** @type {typeof import('@adonisjs/lucid-mongo/src/LucidMongo/Model')} */
const Model = use('Model')

class Producto extends Model {
    static get collection() {
        return 'productos'
    }

    static get fillable() {
        return ['nombre', 'descripcion', 'precio']
    }
}

module.exports = Producto
