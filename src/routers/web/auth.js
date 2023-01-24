import { Router } from 'express'

import path from 'path'

const authWebRouter = new Router()

authWebRouter.get('/', (req, res) => {
    res.redirect('/home')
})

authWebRouter.get('/login', (req, res) => {
    const name = req.session?.name
    if (name) {
        res.redirect('/')
    } else {
        res.sendFile(path.join(process.cwd(), '/views/auth/login.html'))
    }
})

authWebRouter.get('/logout', (req, res) => {
    const name = req.session?.name
    if (name) {
        req.session.destroy(err => {
            if (!err) {
                res.render(path.join(process.cwd(), '/views/auth/logout.html'), { name })
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
})


authWebRouter.post('/login', (req, res) => {
    req.session.name = req.body.name
    res.redirect('/home')
})



export default authWebRouter