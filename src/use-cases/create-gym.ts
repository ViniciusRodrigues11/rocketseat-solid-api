import { Gym } from "@prisma/client";
import { IGymRepository } from "@/repositories/interfaces/gym-repository";

interface ICreateGym {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface CreateGymUseCaseResponse {
  gym: Gym;
}

export class CreateGymUseCase {
  constructor(private gymRepository: IGymRepository) {
    this.gymRepository = gymRepository;
  }

  async run({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: ICreateGym): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return { gym };
  }
}
