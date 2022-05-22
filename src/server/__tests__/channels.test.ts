// import request from 'supertest';
import { Express } from "express";
import { SuperTestWithHost, Test } from "supertest";
import { DredClient } from "../../client";

import { testSetup } from "../testServer";

describe("channels", () => {
    let agent: SuperTestWithHost<Test>;
    let client: DredClient;
    beforeAll(async () => {
        const server = await testSetup();
        ({ client, agent } = server);
    });

    it("creates a channel on request", async () => {
        const channelName = "fooChannel";
        const response = await agent
            .post(`/channel/${channelName}`)
            //      .send({id: channelName})
            .expect("Content-Type", /json/)
            .expect(200);

        expect(response.body).toMatchObject({
            id: channelName,
            status: "created",
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
    });
});
