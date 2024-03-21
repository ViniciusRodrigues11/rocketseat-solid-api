import { FastifyInstance } from "fastify";
import { verifyJwt } from "../middlewares/verify-jwt";
import { create } from "../controllers/gyms/persist.controller";
import { nearby, search } from "../controllers/gyms/retrieve.controller";
import { verifyUserRole } from "../middlewares/restricted";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.post("/", { onRequest: verifyUserRole("ADMIN") }, create);
  app.get("/", search);
  app.get("/nearby", nearby);
}
