import { PrismaClient } from "@prisma/client";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CreateGymUseCase } from "../create-gym";

export function makeCreateGymUseCase(dbClient: PrismaClient) {
  const gymsRepository = new PrismaGymsRepository(dbClient);
  const useCase = new CreateGymUseCase(gymsRepository);

  return useCase;
}
