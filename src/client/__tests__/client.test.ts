// These are now global due to globals: true in vitest.config.ts
import { beforeAll, vi, describe, it, expect } from "vitest";

import express from "express";
import { DredServer } from "../../server/DredServer";
import { DredClient } from "../../client/DredClient";
import { testSetup } from "../../server/testServer";
import { asyncDelay } from "../../util/asyncDelay";

import type {JsonMessagePayload} from "../../types/JsonMessagePayload";
import { StaticHostDiscovery } from "../../peers/StaticHostDiscovery";

const fit = it.only;

describe("Dred client", () => {
    let server: DredServer, agent, client: DredClient;
    beforeAll(async () => {
        const test = await testSetup();
        ({ server, client, agent } = test);
    });
    describe("discovery", () => {
        it("can resolveDiscovery", async () => {
            const result = await DredClient.resolveDiscovery({
                discovery: new StaticHostDiscovery({})
            });
        });
    });
    describe("unencrypted chan:", () => {
        describe("createChannel", () => {
            it("does createChannel() on server", async () => {
                const serverMethod = vi.spyOn(server, "createChannel");
                const chanName = "client1";
                await client.createChannel(chanName);
                expect(server.channelList.has(chanName)).toBeTruthy();
                expect(serverMethod).toHaveBeenCalled();
            });

            it("throws any error json returned in a server error", async () => {
                const serverMethod = vi
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
            it.todo("keeps a list of callbacks for each channel", async () => {
                const chan = "client3subscribe";
                await client.createChannel(chan);

                const callback1 = function () {};
                const callback2 = function () {};
                client.subscribeToChannels({[chan]: callback1});
                client.subscribeToChannels({[chan]: callback2});
                const subs = client.subscribers.get(chan);
                expect(subs).toMatchObject([
                    { notify: callback1 },
                    { notify: callback2 },
                ]);
            });

            it.todo("triggers the subscriber's callback when messages are posted", async () => {
                const otherClient = server.mkClient("first");
                const chan = "client4subscribeCallback";
                const msg = { roses: "red", violets: "blue", visually: "🦜🍑" };
                await client.createChannel(chan);

                let received = 0;

                otherClient.subscribeToChannels({
                    [chan]: (inbound) => {
                        debugger
                        if (!inbound.msg) {
                          const {details, message, mid, msg, neighborhood, ocid, ts, type} = inbound
                          console.warn("probably an error: ", {details, message, mid, msg, neighborhood, ocid, ts, type})
                        } else {
                        const { visually, msg: parsedMsg } = JSON.parse(inbound.msg);
                        if (visually) console.log(visually, "got message")

                        expect(JSON.parse(inbound.msg)).toMatchObject(msg)
                        received += 1;
                    }
                }});
                await asyncDelay(20);
                await client.postMessage(chan, {
                    type: "poetry",
                    msg: JSON.stringify(msg)
                });
                await asyncDelay(20);

                await client.postMessage(chan, {
                    type: "poetry",
                    msg: JSON.stringify(msg)
                });
                await asyncDelay(20);

                expect(received).toBe(2);
            });
        });
    });

    describe("encrypted chan:", () => {
        it("requires key creation", async () => {
            const chanName = "client1";
            const c = server.mkClient("first");
            await expect(
                c.createChannel(chanName, {
                    encrypted: true,
                })
            ).rejects.toThrow(/generateKey/);
        });
        describe("after keygen:", () => {
            describe("createChannel", () => {
                it("does createChannel() on server", async () => {
                    const serverMethod = vi.spyOn(server, "createChannel");
                    const chanName = "client1";
                    await client.createChannel(chanName, {
                        encrypted: true,
                        allowJoining: true,
                    });
                    expect(server.channelList.has(chanName)).toBeTruthy();
                    expect(serverMethod).toHaveBeenCalled();
                });

                describe("subscribeChannel", () => {
                    it.skip("triggers the subscriber's callback when messages are posted", async () => {
                        const otherClient = server.mkClient("first");
                        const chan = "client4subscribeCallback";
                        const msg = { roses: "red", violets: "blue" };
                        await client.createChannel(chan);

                        let received = 0;
                        client.subscribeToChannels({
                            [chan]: (inbound) => {
                                expect(inbound).toMatchObject(msg);
                                received += 1;
                            }
                        });
                        await asyncDelay(20);

                        await client.postMessage(chan, {
                            type: "poetry",
                            msg: JSON.stringify(msg)
                        });
                        await asyncDelay(20);

                        await client.postMessage(chan, {
                            type: "poetry",
                            msg: JSON.stringify(msg)
                        });
                        await asyncDelay(20);

                        expect(received).toBe(2);
                    });
                });

                describe("postMessage", () => {
                    it.todo("fails when the channel is encrypted", async () => {
                        const encryptedChan = "postMessageBad";
                        await client.createChannel(encryptedChan, {
                            encrypted: true,
                            allowJoining: true,
                        });
                        await expect(
                            client.postMessage(encryptedChan, {
                                type : "generic",
                                msg: JSON.stringify({anything: true})
                            })
                        ).rejects.toThrow(/postEncrypted/);
                    });
                })
                describe("postEncrypted", () => {
                    it.todo("fails when the channel doesn't have encryption enabled", async () => {
                        
                    });
                    it.todo("encodes the provided message as a JSON with an encryption wrapper", async () => {
                        
                    });
                });
            });
        });
    });
});
