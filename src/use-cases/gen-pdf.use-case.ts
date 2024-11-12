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
export default async function generatePdf(
  request: PdfCreate
): Promise<typeof PDFDocument> {
  const margin = 20;
  const rectWidth = sizes.A4_WIDTH - margin * 2;

  let heightAcc = margin; // Start with the top margin

  const options: PDFKit.PDFDocumentOptions = {
    size: "A4",
    layout: "portrait",
    autoFirstPage: true,
    margins: { top: margin, bottom: margin, left: margin, right: margin },
    font: path.join(__dirname, "../fonts/della-respira-regular.ttf"),
  };

  const doc = new PDFDocument(options);

  // Header
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
      margin,
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
      margin,
      heightAcc,
      {
        align: "right",
      }
    );

  heightAcc += 20;

  for (const report of request.content.report) {
    if (heightAcc + 70 > sizes.A4_HEIGHT - margin) {
      doc.addPage();
      heightAcc = margin;
    }

    heightAcc += 30;

    doc.rect(margin, heightAcc, rectWidth, 40).fill("#ada7bd");

    doc
      .fontSize(14)
      .fillColor("#fff")
      .text(report.title.toUpperCase(), margin + 10, heightAcc + 10);

    heightAcc += 40;

    for (const reportContent of report.content) {
      if (reportContent.text) {
        const textHeight = doc.heightOfString(reportContent.text, {
          width: rectWidth,
        });

        if (heightAcc + textHeight > sizes.A4_HEIGHT - margin) {
          doc.addPage();
          heightAcc = margin;
        }

        heightAcc += 10;

        doc
          .fontSize(10)
          .fillColor("#000")
          .text(reportContent.text, margin, heightAcc, {
            width: rectWidth,
          });

        heightAcc += textHeight;
      }

      if (
        reportContent.image !== undefined &&
        request.images &&
        request.images[reportContent.image]
      ) {
        const imageHeight = request.images[reportContent.image].height;

        if (heightAcc + imageHeight > sizes.A4_HEIGHT - margin) {
          doc.addPage();
          heightAcc = margin;
        }

        heightAcc += 10;

        try {
          const file = await urlToFile(request.images[reportContent.image].url);

          doc.image(file, margin, heightAcc, {
            width: request.images[reportContent.image].width,
            height: imageHeight,
          });

          await fs.unlink(file);
        } catch (err) {
          console.log(err);
        }

        heightAcc += imageHeight;
      }
    }
  }

  return doc;
}
