import express from "express";
import cors from "cors";
import pdfRouter from "./routers/pdf.router";

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use(pdfRouter);

app.listen(+(process.env.APP_PORT ?? 3000), () => {
  console.log(`Server is running on port ${process.env.APP_PORT ?? 3000}`);
});
