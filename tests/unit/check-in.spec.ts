import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { CheckInUseCase } from "@/use-cases/ckeckin";
import { MaxDistanceError } from "@/use-cases/errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "@/use-cases/errors/max-number-of-checkin-error";
import { ResourceNotFound } from "@/use-cases/errors/resource-not-found";
import { expect, describe, it, beforeEach, afterEach, vi } from "vitest";

const USER_LOCATIONS = {
  userLatitude: -8.800767325519343,
  userLongitude: -63.88450149562518,
};

const DISTANT_USER_LOCATIONS = {
  userLatitude: -29.942260275213357,
  userLongitude: -51.191550129326764,
};

const SIGNIN_DEFAULT = {
  gymId: "gym-01",
  userId: "user-01",
  ...USER_LOCATIONS,
};

const GYM_LOCATIONS = {
  latitude: -8.800767325519343,
  longitude: -63.88450149562518,
};

describe("Check-in Use Case", () => {
  let checkInRepository: InMemoryCheckInsRepository;
  let gymRepository: InMemoryGymRepository;
  let sut: CheckInUseCase;

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    gymRepository = new InMemoryGymRepository();

    sut = new CheckInUseCase(checkInRepository, gymRepository);

    await gymRepository.create({
      id: "gym-01",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      ...GYM_LOCATIONS,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.run(SIGNIN_DEFAULT);

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in invalid gym", async () => {
    await expect(() =>
      sut.run({
        ...SIGNIN_DEFAULT,
        gymId: "gym-02",
      })
    ).rejects.toBeInstanceOf(ResourceNotFound);
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 2, 0, 0));
    await sut.run(SIGNIN_DEFAULT);

    vi.setSystemTime(new Date(2022, 0, 20, 2, 0, 0));
    await expect(() => sut.run(SIGNIN_DEFAULT)).rejects.toBeInstanceOf(
      MaxNumberOfCheckInsError
    );
  });

  it("should not be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 10, 0, 0));
    await sut.run(SIGNIN_DEFAULT);

    vi.setSystemTime(new Date(2022, 0, 21, 15, 0, 0));
    const { checkIn } = await sut.run(SIGNIN_DEFAULT);

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    expect(
      async () =>
        await sut.run({
          ...SIGNIN_DEFAULT,
          ...DISTANT_USER_LOCATIONS,
        })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
