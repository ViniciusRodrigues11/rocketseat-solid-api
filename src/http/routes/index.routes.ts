import { FastifyInstance } from "fastify";
import { userRoutes } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { profileRoutes } from "./profile.routes";
import { gymsRoutes } from "./gyms.routes";
import { checkInsRoutes } from "./check-ins.routes";

export default async function (app: FastifyInstance) {
  app.register(userRoutes, { prefix: "/users" });
  app.register(authenticateRoutes, { prefix: "/sessions" });
  app.register(profileRoutes);
  app.register(gymsRoutes, { prefix: "/gyms" });
  app.register(checkInsRoutes, { prefix: "/check-in" });

  app.log.info("⚙️  Registered all routes...");
}
