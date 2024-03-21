import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { ResourceNotFound } from "@/use-cases/errors/resource-not-found";
import { GetUserProfile } from "@/use-cases/get-user-profile";
import { hash } from "bcryptjs";
import { expect, describe, it, beforeEach } from "vitest";

describe("Get User Profile Use Case", () => {
  let usersRepository: InMemoryUsersRepository;
  let sut: GetUserProfile;

  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfile(usersRepository);
  });

  it("should be able to get user", async () => {
    const defaultUser = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.run({
      userId: defaultUser.id,
    });

    expect(user.name).toEqual(expect.any(String));
  });

  it("should not be able get user profile with invalid id", async () => {
    await expect(() => {
      return sut.run({
        userId: "invalid-id",
      });
    }).rejects.toBeInstanceOf(ResourceNotFound);
  });
});
