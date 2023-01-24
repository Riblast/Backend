import { Router } from 'express'
import { createFakeProducts } from '../../mocks/products.js'

const productosApiRouter = new Router()

productosApiRouter.get('/api/productos-test', (req, res) => { res.json(createFakeProducts(5)) })

export default productosApiRouter