import { PdfCreate } from "../middlewares/validate/pdf-validate-create.middleware";
import { promises as fs } from "fs";
import urlToFile from "../utils/url-to-file";

export default async function genereatePdf(
  doc: PDFKit.PDFDocument,
  content: PdfCreate
) {
  const options: PDFKit.PDFDocumentOptions = {
    size: "A4",
    layout: "portrait",
    margins: {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50,
    },
  };

  doc.options = options;

  doc.text(content.content.title);

  try {
    const file = await urlToFile(content.images[0].url);

    doc.image(file, { width: 300 });

    await fs.unlink(file);
  } catch (err) {
    console.log(err);
  }

  doc.end();
}
