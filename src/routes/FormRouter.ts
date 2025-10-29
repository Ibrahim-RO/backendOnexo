import { Router } from "express";
import { body } from "express-validator"
import { FormController } from "../controllers/FormController";
import { handleInputErrors } from "../middleware/validation";

const router = Router()

router.get('/', (req, res) => {
    res.send("Hola mundo")
})

router.post("/submissions", FormController.createForm)

router.post("/contact", 
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio'),
    body('lastname')
        .notEmpty().withMessage('El apellido paterno es obligatorio'),
    body('maternalsurname')
        .notEmpty().withMessage('El apellido materno es obligatorio'),
    body('email')
        .notEmpty().withMessage('El email es obligatorio'),
    body('phone')
        .notEmpty().withMessage('El télefono es obligatorio'),
    body('message')
        .notEmpty().withMessage('El mensaje es obligatorio'),
    handleInputErrors,
    FormController.contactForm
)

router.post("/contact-simple", 
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('lastname').notEmpty().withMessage('El apellido paterno es obligatorio'),
    body('maternalsurname').notEmpty().withMessage('El apellido materno es obligatorio'),
    body('email').notEmpty().withMessage('El email es obligatorio'),
    body('phone').notEmpty().withMessage('El télefono es obligatorio'),
    handleInputErrors,
    FormController.contactFormWithoutMessage
)

export default router
