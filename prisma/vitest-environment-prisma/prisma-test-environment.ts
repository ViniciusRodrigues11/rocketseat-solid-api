import "dotenv/config";
import { execSync } from "node:child_process";

import { randomUUID } from "node:crypto";
import { Environment } from "vitest";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL environment variable.");
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set("schema", schema);
  return url.toString();
}

export default <Environment>{
  name: "prisma",
  transformMode: "ssr",
  async setup() {
    const schema = randomUUID();
    process.env.DATABASE_URL = generateDatabaseURL(schema);

    console.log("Migration init on schema: ", schema);
    execSync("npx prisma migrate deploy");
    console.log("Done migrating");

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        );

        await prisma.$disconnect();
      },
    };
  },
};
