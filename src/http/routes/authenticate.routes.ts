import { FastifyInstance } from "fastify";
import { authenticateUser } from "../controllers/authenticate/persist.controller";

export async function authenticateRoutes(app: FastifyInstance) {
  app.post("/", authenticateUser);
}
