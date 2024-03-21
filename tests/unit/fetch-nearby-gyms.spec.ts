import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { FetchNearbyGyms } from "@/use-cases/fetch-nearby-gyms";
import { expect, describe, it, beforeEach } from "vitest";

describe("Fetch Nearby Gyms Use Case", () => {
  let gymRepository: InMemoryGymRepository;
  let sut: FetchNearbyGyms;

  const GYM_LOCATIONS = {
    latitude: -8.800767325519343,
    longitude: -63.88450149562518,
  };

  beforeEach(async () => {
    gymRepository = new InMemoryGymRepository();
    sut = new FetchNearbyGyms(gymRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
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
      userLatitude: -8.800767325519343,
      userLongitude: -63.88450149562518,
    });

    expect(gyms).toHaveLength(2);
  });

  it("should not be able to fetch nearby gyms", async () => {
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
      userLatitude: -29.942260275213357,
      userLongitude: -51.191550129326764,
    });

    expect(gyms).toHaveLength(0);
  });
});
