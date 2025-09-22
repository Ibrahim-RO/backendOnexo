import { Router } from "express";
import { FormController } from "../controllers/FormController";

const router = Router()

router.post("/submissions", FormController.createForm);

export default router
