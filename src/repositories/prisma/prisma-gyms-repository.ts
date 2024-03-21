import { Gym, Prisma, PrismaClient } from "@prisma/client";
import { IFindManyNearby, IGymRepository } from "../interfaces/gym-repository";

export class PrismaGymsRepository implements IGymRepository {
  constructor(private dbClient: PrismaClient) {
    this.dbClient = dbClient;
  }

  async findById(id: string) {
    const gym = this.dbClient.gym.findUnique({
      where: {
        id,
      },
    });

    return gym;
  }

  async findManyNearby({ latitude, longitude }: IFindManyNearby) {
    const gyms = await this.dbClient.$queryRaw<Gym[]>`
        SELECT * FROM gyms
        WHERE   ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return gyms;
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = await this.dbClient.gym.create({
      data,
    });

    return gym;
  }

  async searchMany(query: string, page: number) {
    const gyms = this.dbClient.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return gyms;
  }
}
