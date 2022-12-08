const express = require('express')
const { Router } = express

const cartRouter = new Router()

const CartFileContainer = require('../containers/CartFileContainer')
const FileContainer = require('../containers/FileContainer')

const productService = new FileContainer('./db/products.json')
const cartService = new CartFileContainer('./db/carts.json')

cartRouter.post('/', async (req, res) =>{
    const timeStamp = Date.now();

    const cart = {
        "timestamp": timeStamp,
        "products": []
    }
    const newCart = await cartService.createCart(cart)
    res.json(newCart)
})

cartRouter.delete('/:id', async (req, res) =>{
    const id = req.params.id
    const cart = await cartService.deleteCart(id)

    res.json(cart)
})

cartRouter.get('/:id/productos', async (req, res) =>{
    const id = parseInt(req.params.id)
    const prods = await cartService.getProducts(id)

    res.json(prods)
})

cartRouter.post('/:id/productos/:idProd', async (req, res) =>{
    const id = parseInt(req.params.id)
    const idProd = parseInt(req.params.idProd)

    const prod = await productService.getById(idProd)
    const addedProd = await cartService.addProduct(prod, id)

    res.json(addedProd)
})

cartRouter.delete('/:id/productos/:idProd', async (req, res) =>{
    const id = parseInt(req.params.id)
    const idProd = parseInt(req.params.idProd)

    const cart = await cartService.deleteProd(id, idProd)
    res.json(cart)
})


module.exports = cartRouter