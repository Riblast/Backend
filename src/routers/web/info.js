import { Router } from 'express'
import os from 'os'
const pathname = new URL(import.meta.url)
const infoWebRouter = new Router()

infoWebRouter.get('/info', (req, res) =>{
    const info = {
        argumentos_de_entrada: process.argv,
        sistema_operativo: process.platform,
        version_de_node: process.version,
        memoria_total_reservada: process.memoryUsage().rss,
        ruta_de_ejecución: process.cwd(),
        id_del_proyecto: process.pid,
        carpeta_del_proyecto: pathname,
        numero_de_procesadores: os.cpus().length
    }
    console.log(info)
    res.send(`
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Info</title>
        </head>
        <body>
            <h1>System info</h1>
            <ul>
                <li><p>Argumentos de entrada: ${info.argumentos_de_entrada}</p></li>
                <li><p>Sistema operativo: ${info.sistema_operativo}</p></li>
                <li><p>Version de node: ${info.version_de_node}</p></li>
                <li><p>Memoria total reservada: ${info.memoria_total_reservada}</p></li>
                <li><p>Ruta de ejecución: ${info.ruta_de_ejecución}</p></li>
                <li><p>Id del proyecto: ${info.id_del_proyecto}</p></li>
                <li><p>Carpeta del proyecto: ${info.carpeta_del_proyecto}</p></li>
                <li><p>Número de procesadores en el servidor: ${info.numero_de_procesadores}</p></li>
            </ul>
        </body>
        </html>
        `
    )
})

export default infoWebRouter