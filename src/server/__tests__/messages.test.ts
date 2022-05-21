import request, { SuperTestWithHost, Test } from "supertest";
import { Express } from "express";

import { testServer } from "../testServer";

describe("channel messages", () => {
let agent: SuperTestWithHost<Test>;
beforeAll(async () => {
  agent = (await testServer()).agent;
});

  it("does not post messages to a non-existing channel", async () => {
    const channelId = "bogus";
    const response = await agent.post(`/channel/${channelId}/message`)
      .expect("Content-Type", /json/)
      .expect(404);

    expect(response.body).toMatchObject({
      error: "channel not found",
    });
  });

  it("posts messages to an existing channel", async () => {
      // tested in channels.test
  });

});
