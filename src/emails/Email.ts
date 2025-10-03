import { transport } from "../config/nodemailer"

type EmailType = {
    name: string
    lastName: string
    maternalSurname: string
    company: string
    email: string
    phone: string
    position: string
    message: string
}

type EmailUserClientType = Pick<EmailType, 'name' | 'lastName' | 'maternalSurname' | 'company' | 'email' | 'phone' | 'position'>
type EmailWithAnswers = EmailUserClientType & { answers: Array<{ question: string, answer: string, dataUserId: number }> }
type ContactEmailType = Pick<EmailType, 'name' | 'lastName' | 'maternalSurname' | 'email' | 'phone' | 'message'>

export class Email {

    // Correo para el cliente
    static emailForClient = async (user: EmailUserClientType) => {
        try {
            const sendEmail = await transport.sendMail({
                from: 'rodriguez.o.ibra@gmail.com',
                to: user.email,
                subject: 'Recibimos tu mensaje',
                html: `
                    <p>Hola: <b>${user.name} ${user.lastName} ${user.maternalSurname}</b></p>
                    <p>Nuestro equipo revisará tu información y se pondrá en contacto contigo en un plazo de 24-48 horas para definir los siguientes pasos.</p>
                    <p>Gracias por confiar en nosotros para tu proyecto de software.</p>
                    <p>Saludos,<br/>Onexo</p>
                `
            });
            console.log('Mensaje enviado al cliente:', sendEmail.messageId);
        } catch (err) {
            console.error('Error enviando correo al cliente:', err);
        }
    }

    static teamEmail = async (data: EmailWithAnswers) => {
        try {
            // Formatear las respuestas si son arrays
            const formattedAnswers = data.answers.map(a => ({
                question: a.question,
                answer: Array.isArray(a.answer) ? a.answer.join(', ') : a.answer
            }));

            const email = await transport.sendMail({
                from: 'rodriguez.o.ibra@gmail.com',
                to: 'rodriguez.o.ibra@gmail.com',
                subject: 'Nueva solicitud de contacto',
                html: `
                    <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
                        <h2 style="color:#0056b3;">Nueva solicitud de contacto</h2>
                        <p>Hola equipo de Onexo,</p>
                        <p>Se recibió una nueva solicitud de un cliente con la siguiente información:</p>
                        
                        <h3>👤 Datos del cliente</h3>
                        <ul>
                            <li><strong>Nombre:</strong> ${data.name} ${data.lastName} ${data.maternalSurname}</li>
                            <li><strong>Correo:</strong> ${data.email}</li>
                            <li><strong>Teléfono:</strong> ${data.phone}</li>
                            <li><strong>Empresa:</strong> ${data.company}</li>
                            <li><strong>Puesto:</strong> ${data.position}</li>
                        </ul>

                        <h3>📝 Respuestas del formulario</h3>
                        <ol>
                            ${formattedAnswers.map(a => `
                                <li>
                                    <p><strong>${a.question}</strong></p>
                                    <p>${a.answer}</p>
                                </li>
                            `).join('')}
                        </ol>

                        <p style="margin-top:20px;">Saludos,<br/>Sistema Onexo</p>
                    </div>
                `
            });
            console.log('Mensaje enviado al equipo:', email.messageId);
        } catch (err) {
            console.error('Error enviando correo al equipo:', err);
        }
    }

    static contactEmail = async (data: ContactEmailType) => {
        try {
            const email = await transport.sendMail({
                from: 'rodriguez.o.ibra@gmail.com',
                to: 'rodriguez.o.ibra@gmail.com',
                subject: 'Nueva solicitud de contacto',
                html: `
                    <p>Hola equipo de Onexo,</p>
                    <p>Se recibió una nueva solicitud de un cliente con la siguiente información:</p>
                    <h3>👤 Datos del cliente</h3>
                        <ul>
                            <li><strong>Nombre:</strong> ${data.name} ${data.lastName} ${data.maternalSurname}</li>
                            <li><strong>Correo:</strong> ${data.email}</li>
                            <li><strong>Teléfono:</strong> ${data.phone}</li>
                        </ul>
                    <p>Mensaje: ${data.message}</p>
                `
            })
        } catch (error) {
            console.error('Error enviando correo al equipo:', error);
        }
    }
}