import { Prisma, PrismaClient } from "@prisma/client";
import { IUserRepository } from "../interfaces/user-repository";

export class PrismaUsersRepository implements IUserRepository {
  constructor(private dbClient: PrismaClient) {
    this.dbClient = dbClient;
  }

  async findByEmail(email: string) {
    const user = await this.dbClient.user.findUnique({ where: { email } });
    return user;
  }

  async findById(id: string) {
    const user = await this.dbClient.user.findUnique({ where: { id } });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await this.dbClient.user.create({ data });
    return user;
  }
}
