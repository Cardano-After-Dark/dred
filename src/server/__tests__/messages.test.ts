import request, { SuperTestWithHost, Test } from "supertest";
import { Express } from "express";

import { testSetup } from "../testServer";
import { DredClient } from "../../client";
import { DredServer } from "../../server";
import { asyncDelay } from "../../util/asyncDelay";

describe("channel messages", () => {
    let agent: SuperTestWithHost<Test>;
    let server: DredServer;
    let client: DredClient;
    beforeAll(async () => {
        const test = await testSetup();
        ({ agent, server, client } = test);
    });

    it("does not post messages to a non-existing channel", async () => {
        const channelId = "bogus";
        const response = await agent
            .post(`/channel/${channelId}/message`)
            .expect("Content-Type", /json/)
            .expect(404);

        expect(response.body).toMatchObject({
            error: "channel not found",
        });
    });

    it("posts messages to an existing channel", async () => {
        const channelName = "fooChannel";
        const response = await agent.post(`/channel/${channelName}`);
        // verifies that it can then post to the channel
        const { id: channelId } = response.body;
        await agent
            .post(`/channel/${channelId}/message`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).toMatchObject({
                    status: "created",
                });
            });
    });

    describe("subscriptions: ", () => {
        it("notifies subscribers when messages are sent in a channel", async () => {
            const otherClient = server.mkClient();
            const chan = "foo";
            const msg = { hi: "there" };
            await client.createChannel(chan);

            otherClient.subscribeChannel(chan, (inbound) => {
                expect(inbound).toMatchObject(msg);
            });
            await asyncDelay(15);
            await client.postMessage(chan, msg);
            await asyncDelay(15);
            expect.assertions(1);

            await client.postMessage(chan, msg);
            await asyncDelay(15);
            expect.assertions(2);
        });

        it("continues consuming events from redis after a first batch", async () => {
            const otherClient = server.mkClient();
            const shortSubscribe = jest
                .spyOn(server, "subscribeTimeout", "get")
                .mockReturnValue(150);

            const chan = "keepgoing";
            const msg = { keepConsuming: "please" };
            await client.createChannel(chan);

            const subscription = otherClient.subscribeChannel(
                chan,
                (inbound) => {
                    expect(inbound).toMatchObject(msg);
                }
            );
            await asyncDelay(15);
            await client.postMessage(chan, msg);
            await asyncDelay(200);
            expect.assertions(1);

            await client.postMessage(chan, msg);
            await asyncDelay(15);
            expect.assertions(2);
        });
    });
});
