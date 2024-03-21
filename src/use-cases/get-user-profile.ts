import { IUserRepository } from "@/repositories/interfaces/user-repository";
import { User } from "@prisma/client";
import { ResourceNotFound } from "./errors/resource-not-found";

interface IUserProfileUseCaseRequest {
  userId: string;
}

interface IUserProfileUseCaseResponse {
  user: User;
}

export class GetUserProfile {
  constructor(private usersRepository: IUserRepository) {
    this.usersRepository = usersRepository;
  }

  async run({
    userId,
  }: IUserProfileUseCaseRequest): Promise<IUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFound("User");
    }

    return { user };
  }
}
