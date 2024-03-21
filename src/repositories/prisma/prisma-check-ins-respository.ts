import { CheckIn, Prisma, PrismaClient } from "@prisma/client";
import { ICheckInRepository } from "../interfaces/check-in-repository";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements ICheckInRepository {
  constructor(private dbClient: PrismaClient) {
    this.dbClient = dbClient;
  }

  async findById(id: string) {
    const checkIn = await this.dbClient.checkIn.findUnique({
      where: {
        id,
      },
    });

    return checkIn;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await this.dbClient.checkIn.create({
      data,
    });

    return checkIn;
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await this.dbClient.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return checkIns;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkIn = await this.dbClient.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });

    if (!checkIn) {
      return null;
    }

    return checkIn;
  }

  async countByUserId(userId: string) {
    const count = await this.dbClient.checkIn.count({
      where: {
        user_id: userId,
      },
    });

    return count;
  }

  async save(data: CheckIn) {
    const checkIn = await this.dbClient.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    });

    return checkIn;
  }
}
