import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { Prisma } from "@prisma/client";
import { hash } from "bcryptjs";
import { expect, describe, it, beforeEach } from "vitest";

describe("Authenticate Use Case", () => {
  let usersRepository: InMemoryUsersRepository;
  let sut: AuthenticateUseCase;
  let defaultUser: Prisma.UserCreateInput;
  const password = "123456";

  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);

    defaultUser = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash(password, 6),
    });
  });

  it("should be able to authenticate", async () => {
    const { user } = await sut.run({
      email: defaultUser.email,
      password,
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate at wrong email", async () => {
    await expect(() => {
      return sut.run({
        email: "wrong@example.com",
        password,
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate at wrong password", async () => {
    await expect(() => {
      return sut.run({
        email: defaultUser.email,
        password: "wrong-password",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
