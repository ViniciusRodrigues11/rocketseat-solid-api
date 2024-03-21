import { ICheckInRepository } from "@/repositories/interfaces/check-in-repository";

interface IUserMetricsRequest {
  userId: string;
}

interface IUserMetricsResponse {
  checkInsCount: number;
}

export class UserMetrics {
  constructor(private checkInRepository: ICheckInRepository) {
    this.checkInRepository = checkInRepository;
  }

  async run({ userId }: IUserMetricsRequest): Promise<IUserMetricsResponse> {
    const checkInsCount = await this.checkInRepository.countByUserId(userId);

    return { checkInsCount };
  }
}
