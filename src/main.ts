import PDFDocument from "pdfkit";
import express, { Request, Response } from "express";
import cors from "cors";
import pdfRouter from "./routers/pdf.router";
import jwt from "jsonwebtoken";

// Testing only //
const token = jwt.sign(
  { permissions: ["generate-pdf"] },
  process.env.JWT_SECRET!,
  { expiresIn: "1y" }
);

console.log(token);
//

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use(pdfRouter);

app.listen(+(process.env.APP_PORT ?? 3000), () => {
  console.log(`Server is running on port ${process.env.APP_PORT ?? 3000}`);
});
