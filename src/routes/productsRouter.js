import { Router } from "express"

productsRouter.get('/', async (req, res) =>{
    const prods = await productService.getAll()

    res.json(prods)
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