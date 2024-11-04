import validate from "../validation.middleware";
import { z } from "zod";

const schema = z.object({
  token: z.string(),
  images: z
    .array(
      z.object({
        url: z.string(),
        width: z.number().optional(),
        height: z.number(),
        label: z.string().optional(),
      })
    )
    .optional(),
  fileName: z.string(),
  content: z.object({
    header: z.object({
      title: z.string(),
      professionalName: z.string(),
      professionalNumber: z.string(),
    }),
    record: z.object({
      title: z.string(),
      createdAt: z.string(),
      patientName: z.string(),
    }),
    report: z.array(
      z.object({
        title: z.string(),
        content: z.array(
          z.object({
            text: z.string().optional(),
            image: z.number().optional(),
          })
        ),
      })
    ),
  }),
});

export type PdfCreate = z.infer<typeof schema>;

export default function validatePdfCreate() {
  return validate(schema);
}
