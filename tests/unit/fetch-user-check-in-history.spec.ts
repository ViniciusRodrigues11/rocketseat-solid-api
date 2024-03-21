import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckInHistory } from "@/use-cases/fetch-user-check-ins-history";
import { expect, describe, it, beforeEach } from "vitest";

describe("Fetch User Check-in History Use Case", () => {
  let checkInRepository: InMemoryCheckInsRepository;
  let sut: FetchUserCheckInHistory;

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInHistory(checkInRepository);
  });

  it("should be able to fetch check-in history", async () => {
    await checkInRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const { checkIns } = await sut.run({
      userId: "user-01",
      page: 1,
    });

    expect(checkIns).toHaveLength(1);
    expect(checkIns).toEqual([expect.objectContaining({ gym_id: "gym-01" })]);
  });

  it("should be able to fetch paginated check-in history", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gym_id: `gym-${i}`,
        user_id: "user-01",
      });
    }

    const { checkIns } = await sut.run({
      userId: "user-01",
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
    ]);
  });
});
