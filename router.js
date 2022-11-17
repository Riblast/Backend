const express = require('express')
const Contenedor = require('./Clase')

const { Router } = express

const router = new Router()
const productos = new Contenedor('./productos.json')


router.get('/', async (req, res) => {

    const prods = await productos.getAll()

    res.send({productos: prods})
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const prod = await productos.getById(id)
    
    res.send({producto: prod})
})

router.post('/', async (req, res) => {

    const item = req.body
    const prod = await productos.save(item)

    res.send({producto: prod})
})

router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const item = req.body
    const updatedProduct = await productos.updateById(id, item)
    res.send({producto: updatedProduct})
})

router.delete('/:id', async (req, res) => {

    const id = parseInt(req.params.id)
    const prod = await productos.deleteById(id)

    res.send(prod)
})

module.exports = router