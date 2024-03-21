import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

const _userSchemaBody = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function registerUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { name, email, password } = _userSchemaBody.parse(request.body);

  const registerUseCase = makeRegisterUseCase(request.dbClient);

  try {
    await registerUseCase.run({
      name,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
