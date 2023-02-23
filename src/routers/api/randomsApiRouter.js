import { Router } from 'express'
import { fork } from 'child_process'

const randomsApiRouter = new Router()

// randomsApiRouter.get('/api/randoms', (req, res) => {
//     const cant = req.query.cant || 100000000
//     const randomProcess = fork('./src/api/random.js')

//     randomProcess.send(cant)

//     randomProcess.on('message', randoms => {
//         res.json(randoms)
//     })

//     randomProcess.on('error', error => {
//         res.send({ error })
//     })
// })

export default randomsApiRouter
