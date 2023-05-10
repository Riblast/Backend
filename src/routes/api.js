import { Router } from 'express'
import { productosDao } from '../daos/index.js'

export const api = Router()

api.get('/', async (req, res) => {
  const prods = await productosDao.listarAll()

  res.send(prods)
})

api.post('/', async (req, res) => {
  const producto = req.body
  const prod = await productosDao.guardar(producto)

  res.send(prod)
})

api.put('/:id', async (req, res) => {
  const idProductoActualizar = req.params.id

  const productoActualizado = req.body
  const updatedProduct = await productosDao.actualizar(idProductoActualizar, productoActualizado)

  res.send(updatedProduct)
})

api.delete('/:id', async (req, res) => {
  const id = req.params.id

  await productosDao.borrar(id)

  res.send({ message: 'Producto eliminado correctamente' })
})
