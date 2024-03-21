import fastify from "fastify";
import indexRoutes from "./http/routes/index.routes";
import prismaPlugin from "./plugins/prisma";
import { logConfig } from "./config/log";
import { env } from "./env";
import { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

export const app = fastify({
  logger: logConfig[env.NODE_ENV] ?? false,
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "5m",
  },
});
app.register(fastifyCookie);
app.register(prismaPlugin);
app.register(indexRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error", issues: error.flatten() });
  }

  app.log.error(error);
  return reply.status(500).send({ message: "Internal server error" });
});
