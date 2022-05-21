// import request from 'supertest';
import { Express } from 'express';
import { SuperTestWithHost, Test } from 'supertest';

import { testServer } from '../testServer';


describe("channels", () => {
let agent: SuperTestWithHost<Test>;
  beforeAll(async () => {
    agent = (await testServer()).agent;
  });

  it("creates a channel on request, and can post to it", async () => {
    const channelName = "fooChannel";
    const response = await agent.post(`/channel/${channelName}`)
//      .send({id: channelName})
      .expect("Content-Type", /json/)
      .expect(200);

      expect(response.body).toMatchObject({
         id: channelName,
         status: "created"
      });
    
      // verifies that it can then post to the channel    
    const { id: channelId } = response.body;
    await agent.post(`/channel/${channelId}/message`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toMatchObject({
          status: "created",
        });
      });    
  });

  it("refuses to recreate a channel", async () => { 
    const channelName = "fooChannel2";
    const response = await agent
      .post(`/channel/${channelName}`)
      //      .send({id: channelName})
      .expect("Content-Type", /json/)
      .expect(200);

    await agent
      .post(`/channel/${channelName}`)
      //      .send({id: channelName})
      .expect("Content-Type", /json/)
      .expect(400);

  })
});