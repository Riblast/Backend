import { createTransport } from 'nodemailer';
import { userMailAdmin, passMailAdmin } from '../config/config.js';
import { logger } from './logger.js';


const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: userMailAdmin,
        pass: passMailAdmin
    }
});

export const sendMailNewUser = async ( newUser ) => {

    const mailOptions = {
        from: 'Servidor Node.js',
        to: userMailAdmin,
        subject: 'Nuevo Usuario',
        html:
        `<h1 style="color: blue;">Nuevo usuario registrado</h1>'
        <div>
            <ul>
                <li>NOMBRE: <span style="color: green;"> ${newUser.nombre}</span></li>
                <li>DIRECCION <span style="color: green;">${newUser.direccion}</span></li>
                <li>EDAD <span style="color: green;">${newUser.edad}</span></li>
                <li>TELEFONO <span style="color: green;">${newUser.phone}</span></li>
                <li>EMAIL <span style="color: green;">${newUser.email}</span></li>
                <li>imagen <img src="uploads/${newUser.photo}" width="16" height="16"/></li>
            </ul>
        </div>`

        /* En el mail me deberia generar en la etiqueta <img> la ruta de imagen: src="/uploads/${newUser.photo}"
        pero en lugar de eso me genera src="https://ci6.googleusercontent.com/proxy/pRkephN1uNbNH7kccOQHLs4kwu68XDd0Se9UMDAzxVOqbtgl2YPVQz-cOXvlAz2-WrqwjH9j4GGalg=s0-d-e1-ft#http:///uploads/1667480529296perfil.jpg"
 */
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        logger.info('mail enviado' , info)
    } catch (err) {
        logger.error(err)
    }

}


export const sendMailNewCart = async ( nombre, email, cart ) => {

    let listaProductosCarrito = '<h3>Mi Carrito</h3>'
        cart.productos.forEach(element => {
            listaProductosCarrito +=`<li>${element.title}   $${element.price} x ${element.cantidad}</li>`
            });

    const mailOptions = {
        from: 'Servidor Node.js',
        to: userMailAdmin,
        subject: 'nuevo pedido de ' + nombre ,
        html: `<h1 style="color: blue;">Nueva compra del usuario: <span style="color: green;"> ${email} </span></h1><div><ul>` 
        + listaProductosCarrito + `<h2>Total $ ${cart.total} </h2></ul><div>`

    }

    try {
        const info = await transporter.sendMail(mailOptions)
        logger.info('mail enviado' , info)
    } catch (err) {
        logger.error(err)
    }

}



