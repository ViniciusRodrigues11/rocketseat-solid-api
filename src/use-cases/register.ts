import { IUserRepository } from "@/repositories/interfaces/user-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists";
import { User } from "@prisma/client";

interface IUserRegister {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: IUserRepository) {
    this.usersRepository = usersRepository;
  }

  async run({
    name,
    email,
    password,
  }: IUserRegister): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return { user };
  }
}
