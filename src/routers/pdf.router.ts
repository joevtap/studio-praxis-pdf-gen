import { Router } from "express";
import pdfController from "../controllers/pdf.controller";

import validatePdfCreate from "../middlewares/validate/pdf-validate-create.middleware";

const router = Router();

router.post("/pdf", validatePdfCreate(), pdfController.create);

export default router;
