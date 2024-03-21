import { PrismaClient } from "@prisma/client";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-respository";
import { CheckInUseCase } from "../ckeckin";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeCheckInUseCase(dbClient: PrismaClient) {
  const checkInRepository = new PrismaCheckInsRepository(dbClient);
  const gymsRepository = new PrismaGymsRepository(dbClient);
  const useCase = new CheckInUseCase(checkInRepository, gymsRepository);

  return useCase;
}
