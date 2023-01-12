import { Router } from 'express'
import { cartsDao as cartsApi } from '../daos/index.js'

const cartsRouter = new Router()

cartsRouter.get('/', async (req, res) =>{
    const prods = await cartsApi.getAll()
    res.json(prods)
})

cartsRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const prod = await cartsApi.getById(id)

    res.json({producto: prod})
})

cartsRouter.post('/', async (req, res) =>{
    const item = req.body
    const prod = await cartsApi.save(item)

    res.json({productos: prod})
})

cartsRouter.put('/:id', async (req, res) =>{
    const id = req.params.id
    const item = req.body
    const updatedProd = await cartsApi.updateById(id, item)

    res.json({producto: updatedProd})
})

cartsRouter.delete('/:id', async (req, res) => {

    const id = req.params.id
    const prod = await cartsApi.deleteById(id)

    res.json(prod)
})


export default cartsRouter