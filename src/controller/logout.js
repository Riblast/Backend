

export const getLogoutController = (req, res) => {
    res.render('pages/logout', { nombre : req.session.nombre})
    req.session.destroy()
}