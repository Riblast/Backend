import { createTransport } from 'nodemailer'
import { logger } from '../loggers'
import * as dotenv from 'dotenv'
dotenv.config()

const transporter = createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.ADMIN_USER_MAIL,
        pass: process.env.ADMIN_USER_PASSWORD
    }
})

// Enviar correo electrónico

export const sendMailNewUser = ( user ) => {
    transporter.sendMail({
        from: 'Servidor node js',
        to: 'admin@example.com',
        subject: 'Nuevo registro',
        html:
        `<h1 style="color: blue;">Nuevo usuario registrado</h1>'
        <div>
            <ul>
                <li>NOMBRE: <span style="color: green;"> ${user.nombre}</span></li>
                <li>DIRECCION <span style="color: green;">${user.direccion}</span></li>
                <li>EDAD <span style="color: green;">${user.edad}</span></li>
                <li>TELEFONO <span style="color: green;">${user.phone}</span></li>
                <li>EMAIL <span style="color: green;">${user.email}</span></li>
                <li>imagen <img src="uploads/${user.photo}" width="16" height="16"/></li>
            </ul>
        </div>`
    }, (error, info) => {
        if (error) {
            logger.error(error)
        } else {
            logger.info('Correo electrónico enviado: ' + info.response)
        }
    })
}