import { Request, Response } from "express";
import DataUser from "../models/DataUserModel";
import FormAnswer from "../models/FormAnswersModel";
import { Email } from "../emails/Email";
import Contact from "../models/ContactModel";

export class FormController {

    static createForm = async (req: Request, res: Response) => {
        try {
            const { form, answers } = req.body;

            const user = new DataUser(form)
            await user.save()

            const infoForm = {
                name: user.name,
                lastName: user.lastname,
                maternalSurname: user.maternalsurname,
                company: user.company,
                email: user.email,
                phone: user.phone,
                position: user.position
            }

            await Email.emailForClient(infoForm)

            if (answers && Array.isArray(answers)) {
                const formattedAnswers = answers.map(a => ({
                    ...a,
                    answer: Array.isArray(a.answer) ? JSON.stringify(a.answer) : a.answer,
                    dataUserId: user.id
                }))

                await FormAnswer.bulkCreate(formattedAnswers);
                await Email.teamEmail({ ...infoForm, answers: formattedAnswers })
            }

            res.status(201).json('Correo enviado correctamente');
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Error al enviar el correo" });
        }
    }

    static contactForm = async (req:Request, res: Response) => {
        try {
            const contact = new Contact(req.body)
            await contact.save()
            
            const info = {
                name: contact.name,
                lastName: contact.lastname,
                maternalSurname: contact.maternalsurname,
                email: contact.email,
                phone: contact.phone,
                message: contact.message
            }

            await Email.contactEmail(info)
            res.json('Información enviada correctamente')
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al enviar el correo" });
        }
    }

}