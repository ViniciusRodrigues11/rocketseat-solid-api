import { Gym } from "@prisma/client";
import { IGymRepository } from "@/repositories/interfaces/gym-repository";

interface IFetchNearbyGymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface IFetchNearbyGymsUseCaseResponse {
  gyms: Gym[];
}

export class FetchNearbyGyms {
  constructor(private gymRepository: IGymRepository) {
    this.gymRepository = gymRepository;
  }

  async run({
    userLatitude,
    userLongitude,
  }: IFetchNearbyGymsUseCaseRequest): Promise<IFetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}
