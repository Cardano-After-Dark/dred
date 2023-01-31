// @ts-expect-error
import { expect, jest, test } from "@jest/globals";

import express from "express";
import { DredServer } from "../../server/DredServer";
import { DredClient } from "../../client/DredClient";
import { testSetup } from "../../server/testServer";
import { asyncDelay } from "../../util/asyncDelay";

import type {JsonMessagePayload} from "../../types/JsonMessagePayload";
import { DevEnvLocalDiscovery } from "../../peers/DevEnvLocalDiscovery";

describe("Dred client", () => {
    let server: DredServer, agent, client: DredClient;
    beforeAll(async () => {
        const test = await testSetup();
        ({ server, client, agent } = test);
    });
    describe("discovery", () => {
        it("can resolveDiscovery", async () => {
            const result = await DredClient.resolveDiscovery({
                discovery: new DevEnvLocalDiscovery()
            });
        });
    });
    describe("unencrypted chan:", () => {
        describe("createChannel", () => {
            it("does createChannel() on server", async () => {
                const serverMethod = jest.spyOn(server, "createChannel");
                const chanName = "client1";
                await client.createChannel(chanName);
                expect(server.channelList.has(chanName)).toBeTruthy();
                expect(serverMethod).toHaveBeenCalled();
            });

            it("throws any error json returned in a server error", async () => {
                const serverMethod = jest
                    .spyOn(server, "createChannel")
                    .mockImplementation(((req, res, next) => {
                        res.status(400).json({ error: "some error" });
                        next();
                    }) as express.RequestHandler);
                const chanName = "client2";
                await expect(client.createChannel(chanName)).rejects.toThrow(
                    "some error"
                );
            });
        });

        describe("subscribeChannel", () => {
            it("keeps a list of callbacks for each channel", async () => {
                const chan = "client3subscribe";
                await client.createChannel(chan);

                const callback1 = function () {};
                const callback2 = function () {};
                client.subscribeChannel(chan, callback1);
                client.subscribeChannel(chan, callback2);
                const subs = client.subscriptions.get(chan);
                expect(subs).toMatchObject([
                    { notify: callback1 },
                    { notify: callback2 },
                ]);
            });

            it("triggers the subscriber's callback when messages are posted", async () => {
                const otherClient = server.mkClient();
                const chan = "client4subscribeCallback";
                const msg = { roses: "red", violets: "blue" };
                await client.createChannel(chan);

                let received = 0;

                otherClient.subscribeChannel(chan, (inbound : JsonMessagePayload) => {
                    expect(inbound).toMatchObject(msg);
                    received += 1;
                });
                await asyncDelay(20);
                await client.postMessage(chan, msg);
                await asyncDelay(20);

                await client.postMessage(chan, msg);
                await asyncDelay(20);

                expect(received).toBe(2);
            });
        });
    });

    describe("encrypted chan:", () => {
        it("requires key creation", async () => {
            const chanName = "client1";
            const c = server.mkClient();
            await expect(
                c.createChannel(chanName, {
                    encrypted: true,
                })
            ).rejects.toThrow(/generateKey/);
        });
        describe("after keygen:", () => {
            describe("createChannel", () => {
                it("does createChannel() on server", async () => {
                    const serverMethod = jest.spyOn(server, "createChannel");
                    const chanName = "client1";
                    await client.createChannel(chanName, {
                        encrypted: true,
                        allowJoining: true,
                    });
                    expect(server.channelList.has(chanName)).toBeTruthy();
                    expect(serverMethod).toHaveBeenCalled();
                });

                describe("subscribeChannel", () => {
                    it("triggers the subscriber's callback when messages are posted", async () => {
                        const otherClient = server.mkClient();
                        const chan = "client4subscribeCallback";
                        const msg = { roses: "red", violets: "blue" };
                        await client.createChannel(chan);

                        let received = 0;
                        otherClient.subscribeChannel(chan, (inbound : JsonMessagePayload ) => {
                            expect(inbound).toMatchObject(msg);
                            received += 1;
                        });
                        await asyncDelay(20);
                        await client.postMessage(chan, msg);
                        await asyncDelay(20);

                        await client.postMessage(chan, msg);
                        await asyncDelay(20);

                        expect(received).toBe(2);
                    });
                });
            });
        });
    });
});
