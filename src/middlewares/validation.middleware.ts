import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export default function validate(schema: ZodSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      res.status(400).send(err.errors);
    }
  };
}
