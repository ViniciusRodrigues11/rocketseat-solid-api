import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "../register";
import { PrismaClient } from "@prisma/client";

export function makeRegisterUseCase(dbClient: PrismaClient) {
  const usersRepository = new PrismaUsersRepository(dbClient);
  const registerUseCase = new RegisterUseCase(usersRepository);

  return registerUseCase;
}
