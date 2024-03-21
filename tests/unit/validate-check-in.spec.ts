import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { LateCheckInValidationError } from "@/use-cases/errors/late-check-in-validation-error";
import { ResourceNotFound } from "@/use-cases/errors/resource-not-found";
import { ValidateCheckInUseCase } from "@/use-cases/validate-checkin";
import { expect, describe, it, beforeEach, afterEach, vi } from "vitest";

describe("Validate check-in use case", () => {
  let checkInRepository: InMemoryCheckInsRepository;
  let sut: ValidateCheckInUseCase;

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInRepository);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to validate check-in", async () => {
    const validCheckin = await checkInRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const { checkIn } = await sut.run({
      checkInId: validCheckin.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to validate check-in with invalid id", async () => {
    await expect(
      async () =>
        await sut.run({
          checkInId: "invalid-id",
        })
    ).rejects.toBeInstanceOf(ResourceNotFound);
  });

  it("should not be able to validate check-in after 20 minutes", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 10, 0, 0));

    const validCheckin = await checkInRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const twentyOneMinutesInMs = 1000 * 60 * 21;
    vi.advanceTimersByTime(twentyOneMinutesInMs);

    expect(
      async () =>
        await sut.run({
          checkInId: validCheckin.id,
        })
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
