import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { UserMetrics } from "@/use-cases/get-user-metrics";
import { expect, describe, it, beforeEach } from "vitest";

describe("Get User Metrics", () => {
  let checkInRepository: InMemoryCheckInsRepository;
  let sut: UserMetrics;

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new UserMetrics(checkInRepository);
  });

  it("should be able to get check-in count", async () => {
    await checkInRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const { checkInsCount } = await sut.run({ userId: "user-01" });

    expect(checkInsCount).toEqual(1);
  });
});
