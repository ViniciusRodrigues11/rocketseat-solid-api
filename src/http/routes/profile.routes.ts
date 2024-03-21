import { FastifyInstance } from "fastify";
import { getProfile } from "../controllers/profile/retrieve.controller";
import { verifyJwt } from "../middlewares/verify-jwt";
import { refresh } from "../controllers/profile/persist.controller";

export async function profileRoutes(app: FastifyInstance) {
  app.get("/me", { onRequest: [verifyJwt] }, getProfile);
  app.patch("/token/refresh", refresh);
}
