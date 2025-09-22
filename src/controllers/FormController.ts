import { Request, Response } from "express";
import DataUser from "../models/DataUserModel";
import FormAnswer from "../models/FormAnswersModel";
import { Email } from "../emails/Email";

export class FormController {

    static createForm = async (req: Request, res: Response) => {
        try {
            const { form, answers } = req.body;
            console.log(form)
            console.log(answers)

            const user = new DataUser(form)
            await user.save()

            const infoForm = {
                name: user.name,
                lastName: user.lastname,
                maternalSurname: user.maternalsurname,
                company: user.company,
                email: user.email,
                phone: user.phone
            }

            await Email.emailForClient(infoForm)

            if (answers && Array.isArray(answers)) {
                const formattedAnswers = answers.map((a) => ({
                    ...a,
                    dataUserId: user.id,
                }));

                await FormAnswer.bulkCreate(formattedAnswers);
            }

            res.status(201).json('Correo enviado correctamente');
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Error al enviar el correo" });
        }
    }

}