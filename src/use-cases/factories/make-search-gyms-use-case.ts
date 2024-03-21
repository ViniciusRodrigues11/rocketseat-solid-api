import { PrismaClient } from "@prisma/client";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { SearchGym } from "../search-gyms";

export function makeSearchGymsUseCase(dbClient: PrismaClient) {
  const gymsRepository = new PrismaGymsRepository(dbClient);
  const useCase = new SearchGym(gymsRepository);

  return useCase;
}
