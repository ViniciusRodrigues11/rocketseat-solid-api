import { CheckIn } from "@prisma/client";
import { ICheckInRepository } from "@/repositories/interfaces/check-in-repository";

interface IFetchUserCheckInHistoryRequest {
  userId: string;
  page: number;
}

interface IFetchUserCheckInHistoryResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInHistory {
  constructor(private checkInRepository: ICheckInRepository) {
    this.checkInRepository = checkInRepository;
  }

  async run({
    userId,
    page,
  }: IFetchUserCheckInHistoryRequest): Promise<IFetchUserCheckInHistoryResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(
      userId,
      page
    );

    return { checkIns };
  }
}
