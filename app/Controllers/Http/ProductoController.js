'use strict'

const Producto = use('App/Models/Producto')

class ProductoController {
    async index({ response }) {
        const productos = await Producto.all()

        response.json(productos)
    }

    async store({ request, response }) {
        const productoData = request.only(['nombre', 'descripcion', 'precio'])

        const producto = await Producto.create(productoData)

        response.json(producto)
    }

    async show({ params, response }) {
        const producto = await Producto.find(params.id)

        response.json(producto)
    }

    async update({ params, request, response }) {
        const productoData = request.only(['nombre', 'descripcion', 'precio'])

        const producto = await Producto.find(params.id)

        producto.merge(productoData)

        await producto.save()

        response.json(producto)
    }

    async destroy({ params, response }) {
        const producto = await Producto.find(params.id)

        await producto.delete()

        response.json({ message: 'Producto eliminado' })
    }
}

module.exports = ProductoController
