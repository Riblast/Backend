const express = require('express')
const { Router } = express

const productsRouter = new Router()

const FileContainer = require('../containers/FileContainer')

const productService = new FileContainer('./db/products.json')


const createErrorIsNotAdmin = (rute, method) =>{
    const error = {
        error: -1
    }
    if(rute && method){
        error.description = `ruta ${rute}, método ${method} no autorizado`
    }else{
        error.description = 'no autorizado'
    }
    return error
}

const isAdmin = true

const onlyAdmin = (req, res, next) =>{
    if(!isAdmin){
        res.json(createErrorIsNotAdmin(req.url, req.method))
    }else{
        next()
    }
}



productsRouter.get('/', async (req, res) =>{
    const prods = await productService.getAll()

    res.json({productos: prods})
})

productsRouter.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const prod = await productService.getById(id)

    res.json({producto: prod})
})

productsRouter.post('/', onlyAdmin, async (req, res) =>{
    const item = req.body
    const prod = await productService.save(item)

    res.json({productos: prod})
})

productsRouter.put('/:id', onlyAdmin, async (req, res) =>{
    const id = parseInt(req.params.id)
    const item = req.body
    const updatedProd = await productService.updateById(id, item)

    res.json({producto: updatedProd})
})

productsRouter.delete('/:id', onlyAdmin, async (req, res) => {

    const id = parseInt(req.params.id)
    const prod = await productService.deleteById(id)

    res.json(prod)
})

module.exports = productsRouter
