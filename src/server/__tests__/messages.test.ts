import { beforeAll, describe, it, vi, expect } from "vitest";
import request, { SuperTestWithHost, Test } from "supertest";
import { Express } from "express";

import { testSetup } from "../testServer.js";
import { DredClient } from "../../client/DredClient.js";
import { DredServer } from "../DredServer.js";
import { asyncDelay } from "../../util/asyncDelay.js";

const fit = it.only;

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
        // low-level post:
        const response = await agent
            .post(`/channel/${channelId}/message`)
            .expect("Content-Type", /json/)
            .expect(404);

        expect(response.body).toMatchObject({
            error: "channel not found",
        });
    });

    describe("non-encrypted", () => {
        it("posts messages to an existing channel", async () => {
            const channelName = "fooChannel";
            const response = await agent.post(`/channel/${channelName}`);
            // verifies that it can then post to the channel
            const { id: channelId } = response.body;
            //low-level post
            const result = agent
                .post(`/channel/${channelId}/message`)
                .send({
                    msg: "hiya",
                    ocid: "42-1234",
                    type: "greeting",
                })
                .expect("Content-Type", /json/);

            await result.then((res) => {
                expect(res.body).toMatchObject({
                    status: "created",
                });
            });
            await expect(result.expect(200)).resolves.toBeTruthy();
        });

        describe("subscriptions: ", () => {
            it("notifies subscribers when messages are sent in a channel", async () => {
                const otherClient = server.mkClient("first");
                const chan = "foo";
                const msg = {
                    msg: JSON.stringify({ hello: "world" }),
                    type: "greeting",
                };
                await client.createChannel(chan);

                let received = 0;

                debugger;
                otherClient.subscribeToChannels({
                    [chan]: (inbound) => {
                        // party emoji: 🎉
                        // console.log("  🎉🎉🎉🎉🎉🎉  inbound", inbound);
                        expect(inbound).toMatchObject(msg);
                        received += 1;
                    },
                });
                await asyncDelay(200);

                // high-level message creation:
                await client.postMessage(chan, msg);
                await asyncDelay(20);

                // high-level message creation:
                await client.postMessage(chan, msg);
                await asyncDelay(200);
                expect(received).toBe(2);
            });

            it("continues consuming events from redis after a first batch", async () => {
                const otherClient = server.mkClient("first");
                const shortSubscribe = vi
                    .spyOn(server, "subscribeTimeout", "get")
                    .mockReturnValue(150);

                const chan = "keepgoing";
                const msg = {
                    msg: JSON.stringify({
                        hello: "world",
                        keepConsuming: "please",
                    }),
                    type: "greeting",
                };
                await client.createChannel(chan);

                // console.log("created channel");
                let received = 0;
                const subscription = otherClient.subscribeToChannels({
                    [chan]: ({connection, ...inbound}) => {
                        client.logger.info("chan msg", inbound);
                        // console.log("chan msg", inbound);
                        expect(inbound).toMatchObject(msg);
                        received += 1;
                    },
                });
                await asyncDelay(20);
                // console.log("posting");

                // high-level
                await client.postMessage(chan, msg);
                // low-level
                // const response = await agent
                //     .post(`/channel/${chan}/message`)
                //     .send({
                //         ...msg,
                //         ocid: "42-1234",
                //     })
                //     .expect("Content-Type", /json/)
                    // .expect(200);

                await asyncDelay(20);

                // console.log("posting again");

                // await client.postMessage(chan, msg)
                await agent
                    .post(`/channel/${chan}/message`)
                    .send({ 
                        ...msg, 
                        ocid: "42-4321" 
                    })
                    .expect("Content-Type", /json/)
                    .expect(200);

                await asyncDelay(20);

                expect(received).toBe(2);
            });
        });
    });
});
