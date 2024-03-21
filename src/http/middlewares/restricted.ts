import { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(roleToBeVerified: "ADMIN" | "MEMBER") {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user;

    if (role !== roleToBeVerified) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
  };
}
