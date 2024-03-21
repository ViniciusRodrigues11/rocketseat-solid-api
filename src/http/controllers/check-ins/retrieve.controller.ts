import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";
import { makeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case";

const _checkInHistoryQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
});

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const { page } = _checkInHistoryQuerySchema.parse(request.query);
  const userId = request.user.sub;

  const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase(
    request.dbClient
  );

  const { checkIns } = await fetchUserCheckInsHistoryUseCase.run({
    userId,
    page,
  });

  return reply.status(200).send(checkIns);
}

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub;

  const fetchUserMetricsUseCase = makeGetUserMetricsUseCase(request.dbClient);
  const { checkInsCount } = await fetchUserMetricsUseCase.run({
    userId,
  });

  return reply.status(200).send(checkInsCount);
}
