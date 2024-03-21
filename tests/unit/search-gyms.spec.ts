import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { SearchGym } from "@/use-cases/search-gyms";
import { expect, describe, it, beforeEach } from "vitest";

describe("Fetch User Check-in History Use Case", () => {
  let gymRepository: InMemoryGymRepository;
  let sut: SearchGym;

  const GYM_LOCATIONS = {
    latitude: -8.800767325519343,
    longitude: -63.88450149562518,
  };

  beforeEach(async () => {
    gymRepository = new InMemoryGymRepository();
    sut = new SearchGym(gymRepository);
  });

  it("should be able to fetch check-in history", async () => {
    await gymRepository.create({
      id: "gym-01",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      ...GYM_LOCATIONS,
    });

    await gymRepository.create({
      id: "gym-01",
      title: "Gym",
      description: "",
      phone: "",
      ...GYM_LOCATIONS,
    });

    const { gyms } = await sut.run({
      query: "JavaScript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
  });

  it("should be able to fetch paginated check-in history", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        id: `gym-${i}`,
        title: `Gym ${i}`,
        description: "",
        phone: "",
        ...GYM_LOCATIONS,
      });
    }

    const { gyms } = await sut.run({
      query: "Gym",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Gym 21" }),
      expect.objectContaining({ title: "Gym 22" }),
    ]);
  });
});
