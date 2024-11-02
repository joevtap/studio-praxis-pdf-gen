import path from "node:path";
import { promises as fs } from "node:fs";

export default async function urlToFile(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch file");

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const randomFileName = Math.random().toString(36).substring(7);

  const filePath = path.join(
    __dirname,
    `../tmp/${randomFileName}.${url.split(".").pop()}`
  );
  await fs.writeFile(filePath, buffer);

  return filePath;
}
