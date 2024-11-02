import jwt from "jsonwebtoken";

export default function canUserGeneratePdf(token: string): boolean {
  const jwtSecret = process.env.JWT_SECRET ?? "ADD JWT_SECRET TO .env FILE!";

  if (!process.env.JWT_SECRET) console.error(jwtSecret);

  try {
    const payload: jwt.JwtPayload | string = jwt.verify(token, jwtSecret);

    const { permissions } = payload as jwt.JwtPayload;

    if (!permissions) return false;
    return permissions.includes("generate-pdf");
  } catch (error) {
    console.error(error);
    return false;
  }
}
