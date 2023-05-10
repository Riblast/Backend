import { usuariosDao } from '../daos/index.js'

const getData = async (req, res) => {
  const usuario = await usuariosDao.listar(req.session.passport.user)
  return {
    nombre: usuario.nombre,
    edad: usuario.edad,
    direccion: usuario.direccion,
    phone: usuario.phone,
    email: usuario.email,
    photo: usuario.photo
  }
}
export default getData
