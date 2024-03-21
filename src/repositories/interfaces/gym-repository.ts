import { Gym, Prisma } from "@prisma/client";

export interface IFindManyNearby {
  latitude: number;
  longitude: number;
}

interface IGymRepository {
  findById(userId: string): Promise<Gym | null>;
  findManyNearby(params: IFindManyNearby): Promise<Gym[]>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  searchMany(query: string, page: number): Promise<Gym[]>;
}

export { IGymRepository };
