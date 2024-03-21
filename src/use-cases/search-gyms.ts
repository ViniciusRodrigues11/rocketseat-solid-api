import { Gym } from "@prisma/client";
import { IGymRepository } from "@/repositories/interfaces/gym-repository";

interface ISearchGymUseCaseRequest {
  query: string;
  page: number;
}

interface ISearchGymUseCaseResponse {
  gyms: Gym[];
}

export class SearchGym {
  constructor(private gymRepository: IGymRepository) {
    this.gymRepository = gymRepository;
  }

  async run({
    query,
    page,
  }: ISearchGymUseCaseRequest): Promise<ISearchGymUseCaseResponse> {
    const gyms = await this.gymRepository.searchMany(query, page);

    return { gyms };
  }
}
