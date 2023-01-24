import { Router } from 'express'
import { webAuth } from '../../auth/index.js'

import path from 'path'

const productsWebRouter = new Router()

productsWebRouter.get('/home', webAuth, (req, res) => {
    res.sendFile(path.join(process.cwd(), '/views/index.html'), { name: req.session.name })
})

productsWebRouter.get('/productos-vista-test', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/views/productos-vista-test.html'))
})

export default productsWebRouter