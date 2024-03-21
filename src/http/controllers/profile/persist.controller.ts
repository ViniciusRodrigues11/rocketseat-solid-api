import { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true });

  const { role } = request.user;

  const sign = {
    sub: request.user.sub,
  };

  const token = await reply.jwtSign({ role }, { sign });

  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        ...sign,
        expiresIn: "7d",
      },
    }
  );

  return reply
    .status(200)
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: true,
    })
    .send({ token });
}
