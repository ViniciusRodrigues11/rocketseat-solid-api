import { PrismaClient } from "@prisma/client";
import { UserMetrics } from "../get-user-metrics";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-respository";

export function makeGetUserMetricsUseCase(dbClient: PrismaClient) {
  const checkInRepository = new PrismaCheckInsRepository(dbClient);
  const useCase = new UserMetrics(checkInRepository);

  return useCase;
}
