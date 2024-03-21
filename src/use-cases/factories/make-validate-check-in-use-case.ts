import { PrismaClient } from "@prisma/client";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-respository";
import { ValidateCheckInUseCase } from "../validate-checkin";

export function makeValidateCheckInUseCase(dbClient: PrismaClient) {
  const checkInRepository = new PrismaCheckInsRepository(dbClient);
  const useCase = new ValidateCheckInUseCase(checkInRepository);

  return useCase;
}
