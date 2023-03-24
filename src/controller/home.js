import { usuariosDao , productosDao } from "../daos/index.js"


export const getHomeController = async (req, res) => {
    if(req.isAuthenticated()){
        const nombre = (await usuariosDao.listar(req.session.passport.user))[0].nombre
        const edad = (await usuariosDao.listar(req.session.passport.user))[0].edad
        const direccion = (await usuariosDao.listar(req.session.passport.user))[0].direccion
        const phone = (await usuariosDao.listar(req.session.passport.user))[0].phone
        const email = (await usuariosDao.listar(req.session.passport.user))[0].email
        const photo = (await usuariosDao.listar(req.session.passport.user))[0].photo
        global.productos = await productosDao.listarAll()
        res.render('pages/home', {
            nombre: nombre,
            edad: edad,
            direccion: direccion,
            phone: phone,
            email: email,
            photo: photo,
            productos: global.productos,
            active: 'home' //pestana activa de NAVBAR
        })
    } else {
        res.redirect('/login' )

    }
}
