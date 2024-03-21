import { FastifyInstance } from "fastify";
import { verifyJwt } from "../middlewares/verify-jwt";
import { metrics, history } from "../controllers/check-ins/retrieve.controller";
import { create, validate } from "../controllers/check-ins/persist.controller";
import { verifyUserRole } from "../middlewares/restricted";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.get("/history", history);
  app.get("/metrics", metrics);
  app.post("/:gymId", create);
  app.patch(
    "/:checkInId/validate",
    { onRequest: [verifyUserRole("ADMIN")] },
    validate
  );
}
