import { PdfCreate } from "../middlewares/validate/pdf-validate-create.middleware";
import PDFDocument from "pdfkit";
import { promises as fs } from "fs";
import urlToFile from "../utils/url-to-file";
import path from "path";
import sizes from "../constants/sizes";

/**
 *
 * @param request PdfCreate
 * @returns Promise<typeof PDFDocument>
 *
 * @description
 *
 * This function generates a PDF document based on the request object.
 *
 * The request object must have the structure defined in the PdfCreate type located in `src/middlewares/validate/pdf-validate-create.middleware.ts`.
 */
export default async function genereatePdf(
  request: PdfCreate
): Promise<typeof PDFDocument> {
  const margin = 20;
  const rectWidth = sizes.A4_WIDTH - margin * 2;

  let heightAcc = 0; // Used to control the height of the document

  const options: PDFKit.PDFDocumentOptions = {
    size: "A4",
    layout: "portrait",
    autoFirstPage: true,
    margins: { top: margin, bottom: margin, left: margin, right: margin },
    font: path.join(__dirname, "../fonts/della-respira-regular.ttf"),
  };

  const doc = new PDFDocument(options);

  // Every time we add something to the document, we need to increment this value
  heightAcc += 20; // In this case, we are adding 20 to the heightAcc for the top margin

  doc
    .fontSize(10)
    .fillColor("#cbb099")
    .text(request.content.header.title.toUpperCase(), margin, heightAcc);

  doc
    .fontSize(10)
    .fillColor("#cbb099")
    .text(
      request.content.header.professionalName.toUpperCase(),
      margin,
      heightAcc,
      {
        align: "right",
      }
    );

  heightAcc += 14;

  doc
    .fontSize(8)
    .fillColor("#cbb099")
    .text(
      request.content.header.professionalNumber.toUpperCase(),
      20,
      heightAcc,
      {
        align: "right",
      }
    );

  heightAcc += 20;

  doc.rect(margin, heightAcc, rectWidth, 5).fill("#ada7bd");

  heightAcc += 20;

  doc
    .fontSize(16)
    .fillColor("#cbb099")
    .text(request.content.record.patientName.toUpperCase(), margin, heightAcc);

  doc
    .fontSize(10)
    .fillColor("#cbb099")
    .text(request.content.record.title.toUpperCase(), margin, heightAcc, {
      align: "right",
    });

  heightAcc += 14;

  doc
    .fontSize(8)
    .fillColor("#cbb099")
    .text(
      new Date(request.content.record.createdAt).toLocaleDateString("pt-br", {
        dateStyle: "short",
      }),
      20,
      heightAcc,
      {
        align: "right",
      }
    );

  for (const report of request.content.report) {
    heightAcc += 30;

    doc.rect(margin, heightAcc, rectWidth, 40).fill("#ada7bd");

    doc
      .fontSize(14)
      .fillColor("#fff")
      .text(report.title.toLocaleUpperCase(), margin + 10, heightAcc + 10);

    heightAcc += 40;

    for (const reportContent of report.content) {
      if (reportContent.text) {
        if (
          heightAcc >
          sizes.A4_HEIGHT - doc.heightOfString(reportContent.text)
        ) {
          doc.addPage();
          heightAcc = 0;
        }

        heightAcc += 10;

        doc
          .fontSize(10)
          .fillColor("#000")
          .text(reportContent.text, margin, heightAcc);

        const nextHeight = doc.heightOfString(reportContent.text);

        heightAcc += nextHeight;
      }

      if (
        reportContent.image !== undefined &&
        request.images &&
        request.images[reportContent.image]
      ) {
        if (
          heightAcc >
          sizes.A4_HEIGHT - request.images[reportContent.image].height
        ) {
          doc.addPage();
          heightAcc = 0;
        }

        heightAcc += 10;

        try {
          const file = await urlToFile(request.images[reportContent.image].url);

          doc.image(file, margin, heightAcc, {
            width: request.images[reportContent.image].width,
            height: request.images[reportContent.image].height,
          });

          await fs.unlink(file);
        } catch (err) {
          console.log(err);
        }

        heightAcc += request.images[reportContent.image].height;

        if (
          heightAcc >
          sizes.A4_HEIGHT - request.images[reportContent.image].height
        ) {
          doc.addPage();
          heightAcc = 0;
        }
      }
    }
  }

  return doc;
}
