import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { IGymRepository } from "@/repositories/interfaces/gym-repository";
import { CreateGymUseCase } from "@/use-cases/create-gym";
import { expect, describe, it, beforeEach } from "vitest";

let gymRepository: IGymRepository;
let sut: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    sut = new CreateGymUseCase(gymRepository);
  });

  it("should to create a gym", async () => {
    const { gym } = await sut.run({
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: 0,
      longitude: 0,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
