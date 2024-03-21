import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaClient } from "@prisma/client";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateUseCase(dbClient: PrismaClient) {
  const usersRepository = new PrismaUsersRepository(dbClient);
  const registerUseCase = new AuthenticateUseCase(usersRepository);

  return registerUseCase;
}
