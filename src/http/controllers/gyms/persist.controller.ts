import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";

const _createGymBodySchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  phone: z.string().nullable(),
  latitude: z.number().refine((value) => {
    return Math.abs(value) <= 90;
  }),
  longitude: z.number().refine((value) => {
    return Math.abs(value) <= 180;
  }),
});

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { title, description, phone, latitude, longitude } =
    _createGymBodySchema.parse(request.body);

  const createGymUseCase = makeCreateGymUseCase(request.dbClient);

  await createGymUseCase.run({
    title,
    description,
    phone,
    latitude,
    longitude,
  });

  return reply.status(201).send();
}
