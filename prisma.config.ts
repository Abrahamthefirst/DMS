import path from "node:path";
import { defineConfig } from "prisma/config";
import { config as loadDotEnv } from "dotenv";
loadDotEnv({ path: path.join(__dirname, '.env') });

export default defineConfig({
  earlyAccess: true,
  schema: path.join(__dirname, "./", "prisma", "schema.prisma"),
});
