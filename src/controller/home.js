import { productosDao } from '../daos/index.js'
import getData from '../utils/userInfo.js'

export const getHomeController = async (req, res) => {
  if (req.isAuthenticated()) {
    const data = await getData()
    global.productos = await productosDao.listarAll()
    res.render('pages/home', {
      nombre: data.nombre,
      edad: data.edad,
      direccion: data.direccion,
      phone: data.phone,
      email: data.email,
      photo: data.photo,
      productos: global.productos,
      active: 'home' // pestana activa de NAVBAR
    })
  } else {
    res.redirect('/login')
  }
}

export const getProductController = async (req, res) => {
  if (req.isAuthenticated()) {
    const data = await getData()
    let product
    try {
      product = await productosDao.listar(req.params.idProduct)
    } catch (error) {
      console.error('Error al buscar el producto:', error)
      return res.status(500).send('Ocurrió un error al buscar el producto, asegurese de ingresar un id válido')
    }

    if (!product) {
      console.log('El producto no existe')
      return res.status(404).send('El producto no existe')
    }
    res.render('pages/product', {
      nombre: data.nombre,
      edad: data.edad,
      direccion: data.direccion,
      phone: data.phone,
      email: data.email,
      photo: data.photo,
      product,
      active: 'product'
    })
  } else {
    res.redirect('/login')
  }
}

export const getCategoryController = async (req, res) => {
  if (req.isAuthenticated()) {
    const data = await getData()
    global.productos = await productosDao.findByCategory(req.params.categoryName)
    res.render('pages/home', {
      nombre: data.nombre,
      edad: data.edad,
      direccion: data.direccion,
      phone: data.phone,
      email: data.email,
      photo: data.photo,
      productos: global.productos,
      active: 'home'
    })
  } else {
    res.redirect('/login')
  }
}
