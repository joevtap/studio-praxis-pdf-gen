import validate from "../validation.middleware";
import { z } from "zod";

const schema = z.object({
  token: z.string(),
  images: z.array(
    z.object({
      url: z.string(),
      width: z.number().optional(),
      height: z.number().optional(),
      label: z.string().optional(),
    })
  ),
  fileName: z.string(),
  content: z.object({
    title: z.string(),
    subtitle: z.string(),
  }),
});

export type PdfCreate = z.infer<typeof schema>;

export default function validatePdfCreate() {
  return validate(schema);
}
