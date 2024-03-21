import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeCheckInUseCase } from "@/use-cases/factories/make-checkin-use-case";
import { makeValidateCheckInUseCase } from "@/use-cases/factories/make-validate-check-in-use-case";

const _createCheckInBodySchema = z.object({
  latitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 90;
  }),
  longitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 180;
  }),
});

const _createCheckInParamsSchema = z.object({
  gymId: z.string().uuid(),
});

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { latitude: userLatitude, longitude: userLongitude } =
    _createCheckInBodySchema.parse(request.body);

  const { gymId } = _createCheckInParamsSchema.parse(request.params);
  const userId = request.user.sub;

  const checkinUseCase = makeCheckInUseCase(request.dbClient);

  const { checkIn } = await checkinUseCase.run({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  });

  return reply.status(200).send(checkIn);
}

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const { checkInId } = z
    .object({ checkInId: z.string().uuid() })
    .parse(request.params);

  const validateCheckInsUseCase = makeValidateCheckInUseCase(request.dbClient);

  await validateCheckInsUseCase.run({
    checkInId,
  });

  return reply.status(204).send();
}
