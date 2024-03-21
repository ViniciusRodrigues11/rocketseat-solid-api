import { FastifyReply, FastifyRequest } from "fastify";
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";
import { z } from "zod";
import { makeFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fetch-nearby-gyms-use-case";

const _searchGymsQuerySchema = z.object({
  query: z.string(),
  page: z.coerce.number().min(1).default(1),
});

const _nearbyGymsQuerySchema = z.object({
  latitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 90;
  }),
  longitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 180;
  }),
});

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const { query, page } = _searchGymsQuerySchema.parse(request.query);

  const searchGymUseCase = makeSearchGymsUseCase(request.dbClient);

  const { gyms } = await searchGymUseCase.run({ query, page });

  return reply.status(200).send(gyms);
}

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const { latitude, longitude } = _nearbyGymsQuerySchema.parse(request.query);

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase(request.dbClient);

  const { gyms } = await fetchNearbyGymsUseCase.run({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(200).send(gyms);
}
