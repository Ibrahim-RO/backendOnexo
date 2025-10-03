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
                    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
                    <!-- Imagen al inicio -->
                    <img src="https://res.cloudinary.com/dykhnd90m/image/upload/v1759513811/img_w6og7q.png" alt="ONEXO" />


                    <p>Hola: <b>${user.name} ${user.lastName} ${user.maternalSurname}</b></p>
                    <p>Hoy diste un paso importante: abriste la puerta a un mundo donde la innovación no es complicada, sino una herramienta poderosa para hacer crecer tu empresa.</p>
                    <p><b>En ONEXO creemos que la tecnología debe ser clara, útil y accionable.</b> Muy pronto nuestro equipo se pondrá en contacto contigo para conocerte mejor y mostrarte como transformar tus procesos en resultados reales.</p>

                    <!-- Botón verde -->
                    <a href="${process.env.FRONTEND_URL}/success-stories"
                        style="display: inline-block; background-color: #16a34a; color: #fff; text-decoration: none; padding: 12px 20px; border-radius: 6px; font-weight: bold; margin: 16px 0; transition: background-color 0.3s ease;">
                        → EXPLORAR CASOS DE ÉXITOS
                    </a>

                    <p>✨ Empresas como la tuya ya confiaron en nosotros y transformaron su operación. <b>Este es solo el comienzo. La innovación ya está de tu lado</b></p>

                    <p>Conectemos pronto,</p>
                    <p><b>Equipo ONEXO</b></p>
                    </div>
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