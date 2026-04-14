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

router.post("/master-class", 
    body('fullName').notEmpty().withMessage('El nombre es obligatorio'),
    body('corporateEmail').notEmpty().withMessage('La corporación es obligatoria'),
    body('phone').notEmpty().withMessage('El teléfono es obligatorio'),
    body('positionLevel').notEmpty().withMessage('El cargo es obligatorio'),
    body('jobTitle').notEmpty().withMessage('El puesto es obligatorio'),
    body('company').notEmpty().withMessage('La empresa es obligatoria'),
    body('industry').notEmpty().withMessage('La industria/giro es obligatoria'),
    body('employeeRange').notEmpty().withMessage('Campo requerido'),
    body('usesAutomationOrAI').notEmpty().withMessage('Campo requerido'),
    body('mainChallenge').notEmpty().withMessage('Campo requerido'),
    body('firstAIImplementationArea').notEmpty().withMessage('Campo requerido'),
    body('implementationTimeline').notEmpty().withMessage('Campo requerido'),
    body('confirmsAIImplementationInterest').notEmpty().withMessage('Campo requerido'),
    body('wantsRoadmapInformation').notEmpty().withMessage('Campo requerido'),
    handleInputErrors,
    FormController.masterClassController
)

export default router
