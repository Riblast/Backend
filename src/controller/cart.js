import { carritosDao, usuariosDao, ordenesDao } from '../daos/index.js'
import { sendMailNewCart } from '../utils/nodemailer.js'
import { sendMessageNewCart } from '../utils/twilio.js'
import getData from '../utils/userInfo.js'

export const getCartController = async (req, res) => {
  if (req.isAuthenticated()) {
    const data = await getData(req, res)
    const miCarrito = await carritosDao.findByUser(req.session.passport.user)

    res.render('pages/cart', {
      nombre: data.nombre,
      edad: data.edad,
      direccion: data.direccion,
      phone: data.phone,
      email: data.email,
      photo: data.photo,
      carrito: miCarrito,
      active: 'cart'
    })
  } else {
    res.redirect('/login')
  }
}

export const postCartAddProductController = async (req, res) => {
  if (req.isAuthenticated()) {
    const userId = req.session.passport.user
    const direccion = (await usuariosDao.listar(userId)).direccion
    const price = global.productos.find(producto => producto.id === req.body.producto.id).price
    const title = global.productos.find(producto => producto.id === req.body.producto.id).title
    let miCarrito = await carritosDao.findByUser(userId)

    if (!miCarrito) {
      const newCart = {
        user: userId,
        address: direccion,
        total: 0,
        productos: []
      }
      miCarrito = await carritosDao.guardar(newCart).catch((error) => { console.log(error) })
    }

    const existingProduct = miCarrito.productos.find(producto => producto.id === req.body.producto.id)

    if (existingProduct) {
      existingProduct.cantidad += Number(req.body.producto.cantidad)
    } else {
      miCarrito.productos.push({ ...req.body.producto, title, price })
    }

    miCarrito.total += Number(req.body.producto.cantidad) * price
    await carritosDao.actualizar(miCarrito)
  } else {
    res.redirect('/login')
  }
}

export const deleteCartProductController = async (req, res) => {
  if (req.isAuthenticated()) {
    const miCarrito = await carritosDao.findByUser(req.session.passport.user)
    const index = miCarrito.productos.findIndex(producto => producto.id === req.params.id)

    miCarrito.total -= miCarrito.productos[index].price * miCarrito.productos[index].cantidad
    miCarrito.productos.splice(index, 1)

    await carritosDao.actualizar(miCarrito)

    res.redirect('/cart')
  } else {
    res.redirect('/login')
  }
}

export const postCartBuyController = async (req, res) => {
  if (req.isAuthenticated()) {
    const usuario = await usuariosDao.listar(req.session.passport.user)
    const miCarrito = await carritosDao.findByUser(req.session.passport.user)
    const orderNumber = (await ordenesDao.countOrders()) + 1
    if (miCarrito && miCarrito.productos.length > 0) {
      const nuevaOrden = {
        user: req.session.passport.user,
        productos: miCarrito.productos,
        total: miCarrito.total,
        orderNumber: orderNumber.toString().padStart(4, '0')
      }
      console.log(nuevaOrden)

      await ordenesDao.guardar(nuevaOrden)

      sendMailNewCart(usuario.nombre, usuario.email, miCarrito)
      sendMessageNewCart(usuario.nombre, usuario.email, miCarrito)

      await carritosDao.borrar(miCarrito.id)
      res.status(200).json({ mensaje: 'Compra exitosa' })
    }
  } else {
    res.redirect('/login')
  }
}
