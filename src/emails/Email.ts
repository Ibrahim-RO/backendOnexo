import { transport } from "../config/nodemailer"

type EmailType = {
    name: string
    lastName: string
    maternalSurname: string
    company: string
    email: string
    phone: string
}

export class Email {

    static emailForClient = async (user: EmailType) => {
        const sendEmail = await transport.sendMail({
            from: 'Onexo <onexo@onexo.com>',
            to: user.email,
            subject: 'Recibimos tu mensaje',
            html: `
                <p>Hola: <b>${user.name} ${user.lastName} ${user.maternalSurname}</b></p>
                <p>Nuestro equipo revisará tu información y se pondrá en contacto contigo en un plazo de 24-48 horas para definir los siguientes pasos.</p>
                <p>Gracias por confiar en nosotros para tu proyecto de software </p>
                <p>Saludos, Onexo</p>
            `
        })

        console.log('Mensaje enviado', sendEmail)

    }

    static teamEmail = async () => {
        const email = await transport.sendMail({
            from: '',
            to: '',
            subject: '',
            html: ``

        })

        console.log('Mensaje enviado', email)
    }
}