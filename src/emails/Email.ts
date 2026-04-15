import { transport, transport2 } from "../config/nodemailer"
import dotenv from 'dotenv'
import { WorkshopLeadType } from "../types"

dotenv.config()

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

    static emailForClient = async (user: EmailUserClientType) => {
        try {
            const sendEmail = await transport.sendMail({
                from: `"ONEXO" marketing@onexo.mx`,
                to: user.email,
                replyTo: 'marketing@onexo.mx',
                subject: 'Recibimos tu mensaje',
                html: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
                        <img src="https://res.cloudinary.com/dykhnd90m/image/upload/v1759513811/img_w6og7q.png" alt="ONEXO" />
                        <p>Hola: <b>${user.name} ${user.lastName} ${user.maternalSurname}</b></p>
                        <p>Hoy diste un paso importante: abriste la puerta a un mundo donde la innovación no es complicada, sino una herramienta poderosa para hacer crecer tu empresa.</p>
                        <p><b>En ONEXO creemos que la tecnología debe ser clara, útil y accionable.</b> Muy pronto nuestro equipo se pondrá en contacto contigo para conocerte mejor y mostrarte cómo transformar tus procesos en resultados reales.</p>
                        <a href="${process.env.FRONTEND_URL}/success-stories"
                            style="display:inline-block; background-color:#16a34a; color:#fff; text-decoration:none; padding:12px 20px; border-radius:6px; font-weight:bold; margin:16px 0;">
                            → EXPLORAR CASOS DE ÉXITO
                        </a>
                        <p>✨ Empresas como la tuya ya confiaron en nosotros y transformaron su operación. <b>Este es solo el comienzo. La innovación ya está de tu lado</b></p>
                        <p>Conectemos pronto,</p>
                        <p><b>Equipo ONEXO</b></p>
                    </div>
                `
            })
            console.log('Mensaje enviado al cliente:', sendEmail.messageId)
        } catch (err) {
            console.error('Error enviando correo al cliente:', err)
        }
    }

    static teamEmail = async (data: EmailWithAnswers) => {
        try {
            const formattedAnswers = data.answers.map(a => ({
                question: a.question,
                answer: Array.isArray(a.answer) ? a.answer.join(', ') : a.answer
            }))

            const email = await transport.sendMail({
                from: `"ONEXO" marketing@onexo.mx`,
                to: 'marketing@onexo.mx',
                replyTo: 'marketing@onexo.mx',
                subject: 'Nueva solicitud de contacto',
                html: `
                    <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
                        <h2 style="color:#0056b3;">Nueva solicitud de contacto</h2>
                        <p>Se recibió una nueva solicitud de un cliente:</p>
                        <ul>
                            <li><strong>Nombre:</strong> ${data.name} ${data.lastName} ${data.maternalSurname}</li>
                            <li><strong>Correo:</strong> ${data.email}</li>
                            <li><strong>Teléfono:</strong> ${data.phone}</li>
                            <li><strong>Empresa:</strong> ${data.company}</li>
                            <li><strong>Puesto:</strong> ${data.position}</li>
                        </ul>
                        <h3>📝 Respuestas</h3>
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
            })
            console.log('Mensaje enviado al equipo:', email.messageId)
        } catch (err) {
            console.error('Error enviando correo al equipo:', err)
        }
    }

    static contactEmail = async (data: ContactEmailType) => {
        try {
            const email = await transport.sendMail({
                from: `"ONEXO" marketing@onexo.mx`,
                to: 'marketing@onexo.mx',
                replyTo: 'marketing@onexo.mx',
                subject: 'Nueva solicitud de contacto',
                html: `
                    <p>Hola equipo de Onexo,</p>
                    <p>Se recibió una nueva solicitud de contacto:</p>
                    <ul>
                        <li><strong>Nombre:</strong> ${data.name} ${data.lastName} ${data.maternalSurname}</li>
                        <li><strong>Correo:</strong> ${data.email}</li>
                        <li><strong>Teléfono:</strong> ${data.phone}</li>
                    </ul>
                    <p><strong>Mensaje:</strong> ${data.message}</p>
                `
            })
            console.log('Mensaje enviado al equipo:', email.messageId)
        } catch (error) {
            console.error('Error enviando correo al equipo:', error)
        }
    }

    static workshopLeadEmail = async (data: WorkshopLeadType) => {
        try {
            const email = await transport2.sendMail({
                from: "luis.morales@onexo.mx",
                to: "luis.morales@onexo.mx",
                cc: "ibra.rodriguez.olaya@gmail.com",
                replyTo: data.corporateEmail,
                subject: `Nuevo registro Workshop IA - ${data.company}`,
                html: `
                <div style="margin:0;padding:40px 0;background:#f3f6fb;font-family:Arial,Helvetica,sans-serif;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                        <tr>
                            <td align="center">
                                <table role="presentation" width="720" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.08);">
                                    
                                    <!-- Header -->
                                    <tr>
                                        <td style="background:linear-gradient(135deg,#2563eb 0%,#1d4ed8 100%);padding:40px 48px;">
                                            <p style="margin:0;color:#bfdbfe;font-size:13px;letter-spacing:.12em;text-transform:uppercase;">
                                                Nuevo Lead
                                            </p>

                                            <h1 style="margin:12px 0 0;color:#ffffff;font-size:32px;line-height:1.2;">
                                                Registro Master Class
                                            </h1>

                                            <p style="margin:14px 0 0;color:#dbeafe;font-size:15px;line-height:1.6;">
                                                Se recibió una nueva solicitud desde el formulario del sitio web.
                                            </p>
                                        </td>
                                    </tr>

                                    <!-- Datos de contacto -->
                                    <tr>
                                        <td style="padding:40px 48px 24px;">
                                            <h2 style="margin:0 0 24px;font-size:20px;color:#111827;">
                                                Información de contacto
                                            </h2>

                                            <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                                                <tr>
                                                    <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;width:220px;font-weight:700;color:#374151;">
                                                        Nombre completo
                                                    </td>
                                                    <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;color:#111827;">
                                                        ${data.fullName}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;font-weight:700;color:#374151;">
                                                        Correo corporativo
                                                    </td>
                                                    <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;">
                                                        <a href="mailto:${data.corporateEmail}" style="color:#2563eb;text-decoration:none;">
                                                            ${data.corporateEmail}
                                                        </a>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;font-weight:700;color:#374151;">
                                                        Teléfono / WhatsApp
                                                    </td>
                                                    <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;color:#111827;">
                                                        ${data.phone}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;font-weight:700;color:#374151;">
                                                        Cargo
                                                    </td>
                                                    <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;color:#111827;">
                                                        ${data.positionLevel}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;font-weight:700;color:#374151;">
                                                        Puesto
                                                    </td>
                                                    <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;color:#111827;">
                                                        ${data.jobTitle}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;font-weight:700;color:#374151;">
                                                        Empresa
                                                    </td>
                                                    <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;color:#111827;">
                                                        ${data.company}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;font-weight:700;color:#374151;">
                                                        Industria / Giro
                                                    </td>
                                                    <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;color:#111827;">
                                                        ${data.industry}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td style="padding:14px 0;color:#374151;font-weight:700;">
                                                        Número de empleados
                                                    </td>
                                                    <td style="padding:14px 0;color:#111827;">
                                                        ${data.employeeRange}
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>

                                    <!-- Interés -->
                                    <tr>
                                        <td style="padding:0 48px 40px;">
                                            <div style="height:1px;background:#e5e7eb;margin-bottom:32px;"></div>

                                            <h2 style="margin:0 0 24px;font-size:20px;color:#111827;">
                                                Interés y necesidades
                                            </h2>

                                            <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                                                <tr>
                                                    <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;width:260px;font-weight:700;color:#374151;vertical-align:top;">
                                                        ¿Ya utiliza automatización o IA?
                                                    </td>
                                                    <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;color:#111827;">
                                                        ${data.usesAutomationOrAI}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;font-weight:700;color:#374151;vertical-align:top;">
                                                        Principal reto operativo o de crecimiento
                                                    </td>
                                                    <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;color:#111827;line-height:1.7;">
                                                        ${data.mainChallenge}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;font-weight:700;color:#374151;">
                                                        Área donde quiere implementar IA primero
                                                    </td>
                                                    <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;color:#111827;">
                                                        ${data.firstAIImplementationArea}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;font-weight:700;color:#374151;">
                                                        Tiempo estimado
                                                    </td>
                                                    <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;color:#111827;">
                                                        ${data.implementationTimeline}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;font-weight:700;color:#374151;">
                                                        ¿Busca implementar IA?
                                                    </td>
                                                    <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;">
                                                        <span style="
                                                            display:inline-block;
                                                            padding:8px 14px;
                                                            border-radius:999px;
                                                            font-size:13px;
                                                            font-weight:700;
                                                            background:${data.confirmsAIImplementationInterest ? '#dcfce7' : '#fee2e2'};
                                                            color:${data.confirmsAIImplementationInterest ? '#166534' : '#991b1b'};
                                                        ">
                                                            ${data.confirmsAIImplementationInterest ? 'Sí' : 'Solo quiere aprender'}
                                                        </span>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td style="padding:14px 0;font-weight:700;color:#374151;">
                                                        ¿Desea recibir más información?
                                                    </td>
                                                    <td style="padding:14px 0;">
                                                        <span style="
                                                            display:inline-block;
                                                            padding:8px 14px;
                                                            border-radius:999px;
                                                            font-size:13px;
                                                            font-weight:700;
                                                            background:${data.wantsRoadmapInformation ? '#dbeafe' : '#f3f4f6'};
                                                            color:${data.wantsRoadmapInformation ? '#1d4ed8' : '#4b5563'};
                                                        ">
                                                            ${data.wantsRoadmapInformation ? 'Sí, desea información' : 'No'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>

                                    <!-- Footer -->
                                    <tr>
                                        <td style="padding:28px 48px;background:#f9fafb;border-top:1px solid #e5e7eb;">
                                            <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.7;">
                                                Este correo fue generado automáticamente desde el formulario de Workshop IA de ONEXO.
                                            </p>
                                        </td>
                                    </tr>

                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            `
            })

            console.log('Correo enviado correctamente:', email.messageId)
        } catch (error) {
            console.error('Error enviando correo:', error)
        }
    }
}
