import { Router } from 'express'
import { getHomeController, getProductController, getCategoryController } from '../controller/home.js'

export const home = Router()
home.get('/', getHomeController)
home.get('/:idProduct', getProductController)
home.get('/category/:categoryName', getCategoryController)
