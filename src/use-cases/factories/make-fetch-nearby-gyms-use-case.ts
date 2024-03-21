import { PrismaClient } from "@prisma/client";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { FetchNearbyGyms } from "../fetch-nearby-gyms";

export function makeFetchNearbyGymsUseCase(dbClient: PrismaClient) {
  const gymsRepository = new PrismaGymsRepository(dbClient);
  const useCase = new FetchNearbyGyms(gymsRepository);

  return useCase;
}
