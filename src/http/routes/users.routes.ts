import { FastifyInstance } from "fastify";
import { registerUser } from "../controllers/users/persist.controller";

export async function userRoutes(app: FastifyInstance) {
  app.post("/", registerUser);
}
