import twilio from 'twilio'
import { twilioSID, twilioToken, twilioMessagingServiceSid, twilioWhastsAppPhoneNumber, adminWhatsAppPhoneNumber, adminPhoneNumber} from '../config/config.js'
import { logger } from './logger.js'

const client = twilio( twilioSID , twilioToken )


export const sendSMSCartToUser = async (newUser) => {

    const msg = `NUEVO USUARIO REGISTARDO
    NOMBRE: ${newUser.nombre}
    DIRECCION: ${newUser.direccion}
    EDAD: ${newUser.edad}
    TELEFONO: ${newUser.phone}
    EMAIL: ${newUser.email}`

    try {
        const message = await client.messages.create({
            body: msg,
            messagingServiceSid: twilioMessagingServiceSid,
            to: adminPhoneNumber               // Uso numero de Admin porque tiene que ser numero validado por twilio
        })
        logger.info(`SMS cart send` , message)

    }catch (error) {
        logger.error(error)
    }
}


export const sendWhatsAppNewUser = async ( newUser ) => {

    const msg = `NUEVO USUARIO REGISTARDO
    NOMBRE: ${newUser.nombre}
    DIRECCION: ${newUser.direccion}
    EDAD: ${newUser.edad}
    TELEFONO: ${newUser.phone}
    EMAIL: ${newUser.email}`

    try {
        const message = await client.messages.create({
            body: msg,
            messagingServiceSid: twilioMessagingServiceSid,
            to: `whatsapp:${adminWhatsAppPhoneNumber}`
        })
        logger.info('whatsApp new user send', message)

    } catch (error) {
        logger.error('error AL ENVIAR',error)
    }
}

export const sendMessageNewCart = async (nombre , email ,  cart ) => {  // funcion que envie whatsApp y SMS con nuevo carrito comprado

    let listaProductosCarrito = `NUEVO CARRITO de ${nombre } ( email: ${email} ) \n`
        cart.productos.forEach(element => {
            listaProductosCarrito +=`${element.title}   $${element.price} x ${element.cantidad} \n`
        });

    const msg = listaProductosCarrito + 'Total: $' + cart.total


    //-----------------ENVIO DE WHATSAPP-------------------//
    try {
        const message = await client.messages.create({
            body: msg,
            messagingServiceSid: twilioMessagingServiceSid,
            to: `whatsapp:${adminWhatsAppPhoneNumber}`
        })
        logger.info('whatsApp new cart send', message)
    } catch (error) {
        logger.error('error AL ENVIAR WHATSAPP new cart',error)
    }
    //-----------------ENVIO DE SMS------------------------//
    try {
        const message = await client.messages.create({
            body: msg,
            messagingServiceSid: twilioMessagingServiceSid,
            to: adminPhoneNumber
        })

        logger.info('SMS new cart send' , message)

    }catch (error) {
        logger.error('ERROR AL ENVIAR SMS new cart' , error)
    }
}


