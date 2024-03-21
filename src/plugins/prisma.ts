import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import { PrismaClient } from "@prisma/client";
import { env } from "@/env";

declare module "fastify" {
  // eslint-disable-next-line no-unused-vars
  interface FastifyInstance {
    prisma: PrismaClient;
  }
  // eslint-disable-next-line no-unused-vars
  interface FastifyRequest {
    dbClient: PrismaClient;
  }
}

export const prisma = new PrismaClient({
  log:
    env.NODE_ENV === "dev"
      ? [
          {
            emit: "event",
            level: "query",
          },
          {
            emit: "event",
            level: "error",
          },
          {
            emit: "event",
            level: "warn",
          },
        ]
      : [],
});

const prismaPlugin: FastifyPluginAsync = fp(async (app) => {
  prisma.$on("query", (e) => {
    app.log.info(e);
  });

  prisma.$on("warn", (e) => {
    app.log.warn(e);
  });

  prisma.$on("error", (e) => {
    app.log.error(e);
  });

  await prisma.$connect();

  app.decorate("prisma", prisma);

  app.addHook("onRequest", (request, reply, done) => {
    request.dbClient = app.prisma;

    done();
  });

  app.addHook("onClose", async (app) => {
    await app.prisma.$disconnect();
  });
});

export default prismaPlugin;
