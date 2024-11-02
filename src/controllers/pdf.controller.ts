import PDFDocument from "pdfkit";
import { Request, Response } from "express";

import canUserGeneratePdf from "../use-cases/can-user-generate-pdf.use-case";
import genereatePdf from "../use-cases/gen-pdf.use-case";
import { PdfCreate } from "../middlewares/validate/pdf-validate-create.middleware";

export default {
  create: async (req: Request, res: Response): Promise<void> => {
    const canGeneratePdf = canUserGeneratePdf(req.body.token);

    if (!canGeneratePdf) {
      res.status(403).send();
      return;
    }
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${(req.body as PdfCreate).fileName}`
    );

    try {
      const doc = new PDFDocument();
      doc.pipe(res);

      genereatePdf(doc, req.body as PdfCreate);
      res.status(200);
      return;
    } catch (_) {
      res.status(500).send();
      return;
    }
  },
};