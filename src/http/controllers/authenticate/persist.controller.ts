import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

const _authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function authenticateUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email, password } = _authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase(request.dbClient);

    const { user } = await authenticateUseCase.run({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: "7d",
        },
      }
    );

    return reply
      .status(200)
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
