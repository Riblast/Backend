import { Router } from 'express'
import { productsDao as productsApi } from '../daos/index.js'

const productsRouter = new Router()

productsRouter.get('/', async (req, res) =>{
    const prods = await productsApi.getAll()

    res.json(prods)
})

productsRouter.get('/:id', async (req, res) =>{
    const id = req.params.id
    const prod = await productsApi.getById(id)

    res.json({producto: prod})
})

productsRouter.post('/', async (req, res) =>{
    const item = req.body
    const prod = await productsApi.save(item)

    res.json({productos: prod})
})

productsRouter.put('/:id', async (req, res) =>{
    const id = req.params.id
    const item = req.body
    const updatedProd = await productsApi.updateById(id, item)

    res.json({producto: updatedProd})
})

productsRouter.delete('/:id', async (req, res) => {

    const id = req.params.id
    const prod = await productsApi.deleteById(id)

    res.json(prod)
})

export default productsRouter