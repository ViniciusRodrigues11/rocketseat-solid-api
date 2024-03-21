import { PrismaClient } from "@prisma/client";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-respository";
import { FetchUserCheckInHistory } from "../fetch-user-check-ins-history";

export function makeFetchUserCheckInsHistoryUseCase(dbClient: PrismaClient) {
  const checkInRepository = new PrismaCheckInsRepository(dbClient);
  const useCase = new FetchUserCheckInHistory(checkInRepository);

  return useCase;
}
