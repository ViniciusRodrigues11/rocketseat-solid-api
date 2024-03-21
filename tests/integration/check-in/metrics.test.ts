import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from "@/plugins/prisma";
import createAndAuthenticateUser from "../util/create-and-authenticate-user";

describe("Check-in Metrics (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get the total count of check-ins", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    const { id: gym_id } = await prisma.gym.create({
      data: {
        title: "Teste aaaa Gym",
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    });

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id,
          user_id: user.id,
        },
        {
          gym_id,
          user_id: user.id,
        },
      ],
    });

    const response = await request(app.server)
      .get("/check-in/metrics")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(2);
  });
});
