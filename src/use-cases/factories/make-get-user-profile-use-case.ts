import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaClient } from "@prisma/client";
import { GetUserProfile } from "../get-user-profile";

export function makeGetUserProfileUseCase(dbClient: PrismaClient) {
  const usersRepository = new PrismaUsersRepository(dbClient);
  const useCase = new GetUserProfile(usersRepository);

  return useCase;
}
