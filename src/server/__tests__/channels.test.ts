// @ts-expect-error
import { expect, jest, test } from "@jest/globals";

// import request from 'supertest';
import { Express } from "express";
import { SuperTestWithHost, Test } from "supertest";
import { DredClient } from "../../client/DredClient.js";

import nacl from "tweetnacl";
const { sign } = nacl;
import util from "tweetnacl-util";
const { encodeUTF8, decodeUTF8, encodeBase64, decodeBase64 } = util;

import { testSetup } from "../testServer.js";
import { DredServer } from "../DredServer.js";
import { asyncDelay } from "../../util/asyncDelay.js";
import {
    Key,
    KeyExchanger,
    KeyExchangerDerivationProof,
} from "../../KeyExchanger.js";

// This test uses a blend of direct** requests to the Dred server (to prove
//   each key function working at a HTTP level), along with some requests
//   using the DredClient class (to set up contextual scenarios more efficiently
//   than would be possible with the direct-request approach).
//
//  ** using supertest / superagent
//
//   DredClient requests are also sometimes used for more efficiently
//   testing server-side functions, but these SHOULD only be used
//   after having triggered those same essential functions using a lower-
//   level, dependency-free** code-path, in order to exercise variations
//   more efficiently.

describe("channels", () => {
    let agent: SuperTestWithHost<Test>;
    let client: DredClient;
    let server: DredServer;

    beforeAll(async () => {
        const setup = await testSetup();
        ({ client, agent, server } = setup);
    });

    describe("non-encrypted:", () => {
        it("creates a channel on request, with createdAt set", async () => {
            const channelName = "fooChannel";
            const response = await agent
                .post(`/channel/${channelName}`)
                .send({ createdAt: new Date().getTime() - 100000 })
                .expect("Content-Type", /json/)
                .expect(200);

            expect(response.body).toMatchObject({
                id: channelName,
                status: "created",
                createdAt: expect.anything(),
            });
            const c = new Date(response.body.createdAt).getTime();
            expect(new Date().getTime() - c).toBeLessThan(200);
        });
        it("fills createdAt, ignoring any client-provided value", async () => {
            // verified as part of basic create case
        });

        it("refuses to recreate a channel", async () => {
            const channelName = "fooChannel2";
            // normal creation:
            const response = await agent
                .post(`/channel/${channelName}`)
                //      .send({id: channelName})
                .expect("Content-Type", /json/)
                .expect(200);

            // failed duplicate creation:
            await agent
                .post(`/channel/${channelName}`)
                //      .send({id: channelName})
                .expect("Content-Type", /json/)
                .expect(400);
        });
    });

    describe("encrypted:", () => {
        let key, pubKey, pubKeyString;

        beforeAll(() => {
            key = client.identity;
            // pubKey = key.publicKey;
            pubKeyString = client.pubKeyString as string;
        });
        it("refuses to create a channel without a provided 'owner' pubKey and valid signature", async () => {
            const channelName = "encChannel3";
            // console.log("no owner");
            let noOwner = await agent
                .post(`/channel/${channelName}`)
                .send({
                    encrypted: true,
                    allowInvites: true,
                })
                .expect("Content-Type", /json/)
                .expect(400);
            expect(noOwner.body.error).toMatch(
                /missing required 'owner' setting/
            );

            // console.log("no sig");
            let noSig = await agent
                .post(`/channel/${channelName}`)
                .send({
                    encrypted: true,
                    allowInvites: true,
                    owner: pubKeyString,
                })
                .expect("Content-Type", /json/)
                .expect(400);

            expect(noSig.body.error).toMatch(/missing signature/);

            // console.log("bad sig");
            let badSig = await agent
                .post(`/channel/${channelName}`)
                .send({
                    encrypted: true,
                    allowInvites: true,
                    owner: pubKeyString,
                    signature: "xyz",
                })
                .expect("Content-Type", /json/)
                .expect(400);

            expect(badSig.body.error).toMatch(/bad signature/);
        });

        it("fills the creator's key into channel's 'owner' setting", async () => {
            const channelName = "enc-chan-creation";
            const signature = await client.signString(channelName);
            await agent
                .post(`/channel/${channelName}`)
                .send({
                    encrypted: true,
                    owner: pubKeyString,
                    signature,
                })
                .expect("Content-Type", /json/)
                .expect(200);

            const options = await server.getChanOptions(channelName);
            expect(options.owner).toBe(pubKeyString);
        });

        it("fills encrypted option and doesn't allow extra keys in channel options", async () => {
            const channelName = "enc-chan-creation-no-extra-stuff";

            const signature = await client.signString(channelName);
            await agent
                .post(`/channel/${channelName}`)
                .send({
                    encrypted: true,
                    owner: pubKeyString,
                    randomValue: "foo",
                    signature,
                })
                .expect("Content-Type", /json/)
                .expect(200);

            const options = (await server.getChanOptions(channelName)) as any;
            expect(options.encrypted).toBeTruthy();
            expect(options.randomValue).toBeUndefined();
        });

        it("triggers channelCreated method on server object", async () => {
            const created = jest.spyOn(server, "channelCreated");
            await client.createChannel("createAndCallback", {
                encrypted: true,
                allowJoining: true,
            });
            expect(created).toBeCalled();
        });

        it("fills createdAt, ignoring any client-provided value", async () => {
            const channelName = "createdAt-enc";
            await client.createChannel(channelName, {
                encrypted: true,
                allowJoining: true,
                createdAt: new Date(new Date().getTime() - 100000),
            });

            const opts = await server.getChanOptions(channelName);
            expect(opts.createdAt).not.toBeUndefined();
            if (!opts.createdAt)
                throw new Error(`never thrown but makes typescript happy`);

            expect(
                new Date().getTime() - opts.createdAt.getTime()
            ).toBeLessThan(200);
        });
        
        describe("joining members", () => {
            it("allows owner to join others with their pubKey and an approval signature", async () => {
                const channelName = "owner-joins-someone";
                await client.createChannel(channelName, {
                    encrypted: true,
                    members: [client.pubKeyString as string],
                });

                const c2 = server.mkClient();
                await c2.generateKey();

                // console.log("missing-sig");
                const missingSig = await agent
                    .post(`/channel/${channelName}/join`)
                    .send({
                        myId: client.pubKeyString,
                        member: c2.pubKeyString,
                    })
                    .expect("Content-Type", /json/)
                    .expect(400);

                expect(missingSig.text).toMatch(
                    /missing required 'signature' field in body/
                );

                // console.log("bad-sig");
                const badSig = await agent
                    .post(`/channel/${channelName}/join`)
                    .send({
                        myId: client.pubKeyString,
                        member: c2.pubKeyString,
                        signature: "badSig",
                    })
                    .expect("Content-Type", /json/)
                    .expect(400);
                expect(badSig.text).toMatch(/bad signature/);

                // console.log("wrong-sig");
                let signature = await c2.signString(c2.pubKeyString as string);
                let wrongSig = await agent
                    .post(`/channel/${channelName}/join`)
                    .send({
                        myId: client.pubKeyString,
                        member: c2.pubKeyString,
                        signature,
                    })
                    .expect("Content-Type", /json/)
                    .expect(400);
                expect(wrongSig.text).toMatch(/bad signature/);

                // console.log("good-sig");
                signature = await client.signString(c2.pubKeyString as string);
                await agent
                    .post(`/channel/${channelName}/join`)
                    .send({
                        myId: client.pubKeyString,
                        member: c2.pubKeyString,
                        signature,
                    })
                    .expect("Content-Type", /json/)
                    .expect(200);

                const opts = await server.getChanOptions(channelName);
                if (!opts.members) throw new Error(`make ts happy`);
                expect(
                    opts.members.find((x) => c2.pubKeyString === x)
                ).toBeDefined();
            });
            describe("join-requests from non-members", () => {
                it("denies join requests by default", async () => {
                    const channelName = "no-joins-by-default";
                    await client.createChannel(channelName, {
                        encrypted: true,
                        members: [client.pubKeyString as string],
                    });

                    const nonMember = server.mkClient();
                    await nonMember.generateKey();

                    let signature = await nonMember.signString(
                        nonMember.pubKeyString as string
                    );
                    const denyJoin = await agent
                        .post(`/channel/${channelName}/join`)
                        .send({
                            myId: nonMember.pubKeyString,
                            member: nonMember.pubKeyString,
                            signature,
                        })
                        .expect("Content-Type", /json/)
                        .expect(403);
                    expect(denyJoin.text).toMatch(/unauthorized/);
                });

                it("denies non-member requests to add anyone else", async () => {
                    const channelName = "noPublicInvitingOthers";
                    await client.createChannel(channelName, {
                        encrypted: true,
                        members: [client.pubKeyString as string],
                        allowJoining: true,
                        approveJoins: "open",
                    });

                    const nonMember = server.mkClient();
                    await nonMember.generateKey();

                    const nonMember2 = server.mkClient();
                    await nonMember2.generateKey();

                    await expect(
                        nonMember.addMemberToChannel(
                            channelName,
                            nonMember2.pubKeyString as string
                        )
                    ).rejects.toThrow(/can't invite others/);
                });

                it("allows join REQUESTS if allowJoining is enabled and approveJoins isn't 'open'", async () => {
                    const channelName = "allowJoinRequest";
                    await client.createChannel(channelName, {
                        encrypted: true,
                        members: [client.pubKeyString as string],
                        allowJoining: true,
                        approveJoins: "member",
                    });

                    const nonMember = server.mkClient();
                    await nonMember.generateKey();

                    let signature = await nonMember.signString(
                        nonMember.pubKeyString as string
                    );
                    await agent
                        .post(`/channel/${channelName}/join`)
                        .send({
                            myId: nonMember.pubKeyString,
                            member: nonMember.pubKeyString,
                            signature,
                        })
                        .expect("Content-Type", /json/)
                        .expect(200);

                    const settings = await server.getChanOptions(channelName);
                    const requests = settings.requests || [];
                    const members = settings.members || [];
                    expect(
                        members.includes(nonMember.pubKeyString as string)
                    ).toBeFalsy();
                    expect(
                        requests.includes(nonMember.pubKeyString as string)
                    ).toBeTruthy();
                });
                it.todo(
                    "posts a 'join-request' message to the channel to notify members of pending requests"
                );
                it("allows joining directly if allowJoining and approveJoins: 'open'", async () => {
                    const channelName = "allowJoinRequest";
                    await client.createChannel(channelName, {
                        encrypted: true,
                        members: [client.pubKeyString as string],
                        allowJoining: true,
                        approveJoins: "open",
                    });

                    const newMember = server.mkClient();
                    await newMember.generateKey();

                    let signature = await newMember.signString(
                        newMember.pubKeyString as string
                    );
                    await agent
                        .post(`/channel/${channelName}/join`)
                        .send({
                            myId: newMember.pubKeyString,
                            member: newMember.pubKeyString,
                            signature,
                        })
                        .expect("Content-Type", /json/)
                        .expect(200);

                    const settings = await server.getChanOptions(channelName);
                    const requests = settings.requests || [];
                    const members = settings.members || [];
                    expect(
                        members.includes(newMember.pubKeyString as string)
                    ).toBeTruthy();
                    expect(
                        requests.includes(newMember.pubKeyString as string)
                    ).toBeFalsy();
                });
            });
            describe("channel expiration", () => {
                it("doesn't allow creating an expired channel", async () => {
                    const past = new Date();
                    const channelName = "expiration";
                    await expect(
                        client.createChannel(channelName, {
                            encrypted: true,
                            members: [client.pubKeyString as string],
                            expiresAt: past,
                        })
                    ).rejects.toThrow(/already in the past/);
                });

                it("doesn't allow joining an expired channel", async () => {
                    const nonMember = server.mkClient();
                    await nonMember.generateKey();

                    const nonMember2 = server.mkClient();
                    await nonMember2.generateKey();

                    const offset = 200;
                    const nearFuture = new Date(new Date().getTime() + offset);
                    const channelName = "expiration";
                    await expect(
                        client.createChannel(channelName, {
                            encrypted: true,
                            members: [client.pubKeyString as string],
                            expiresAt: nearFuture,
                        })
                    ).resolves.toMatchObject({
                        status: "created",
                    });

                    // console.log("join - shouldn't yet be expired");
                    await expect(
                        client.addMemberToChannel(
                            channelName,
                            nonMember.pubKeyString as string
                        )
                    ).resolves.toMatchObject({ status: "joined" });

                    await asyncDelay(offset);
                    // console.log("join - should now be expired");
                    await expect(
                        client.addMemberToChannel(
                            channelName,
                            nonMember.pubKeyString as string
                        )
                    ).rejects.toThrow(/expiresAt is already past/);
                });
            });
            it("allows members to join others with approveJoins: 'member' ", async () => {
                const channelName = "member-joins-others";
                const member = server.mkClient();
                await member.generateKey();

                const nonMember1 = server.mkClient();
                await nonMember1.generateKey();

                const nonMember2 = server.mkClient();
                await nonMember2.generateKey();

                await client.createChannel(channelName, {
                    encrypted: true,
                    members: [member.pubKeyString as string],
                    approveJoins: "member",
                });
                await expect(
                    nonMember1.addMemberToChannel(
                        channelName,
                        nonMember2.pubKeyString as string
                    )
                ).rejects.toThrow(/unauthorized/);
                await expect(
                    member.addMemberToChannel(
                        channelName,
                        nonMember2.pubKeyString as string
                    )
                ).resolves.toMatchObject({ status: "joined" });
            });
            describe("inviting members beyond memberLimit:", () => {
                // use allowJoining, approvJoins: member
                it("can be added by owner", async () => {
                    const channelName = "owner-joins-over-memberLimit";
                    const member1 = server.mkClient();
                    await member1.generateKey();

                    await client.createChannel(channelName, {
                        encrypted: true,
                        memberLimit: 1,
                        members: [
                            client.pubKeyString as string,
                            member1.pubKeyString as string,
                        ],
                    });

                    const member2 = server.mkClient();
                    await member2.generateKey();

                    await expect(
                        client.addMemberToChannel(
                            channelName,
                            member2.pubKeyString as string
                        )
                    ).resolves.toMatchObject({ status: "joined" });
                });
                it("joins fail for members", async () => {
                    const channelName = "no-over-memberLimit";

                    const member1 = server.mkClient();
                    await member1.generateKey();

                    const member2 = server.mkClient();
                    await member2.generateKey();

                    await client.createChannel(channelName, {
                        encrypted: true,
                        memberLimit: 1,
                        approveJoins: "member",
                        members: [
                            client.pubKeyString as string,
                            member1.pubKeyString as string,
                            member2.pubKeyString as string,
                        ],
                    });

                    //! adding an existing member 2 works even though the channel is over-limit,
                    //  because they were already in the channel!
                    // console.log("add already-existing member");
                    await expect(
                        member1.addMemberToChannel(
                            channelName,
                            member2.pubKeyString as string
                        )
                    ).resolves.toMatchObject({ status: "joined" });

                    const member3 = server.mkClient();
                    await member3.generateKey();

                    // console.log("try to add new member");
                    await expect(
                        member1.addMemberToChannel(
                            channelName,
                            member3.pubKeyString as string
                        )
                    ).rejects.toThrow(/channel is full/);
                });
            });
        });

        describe("key exchange", () => {
            it.todo(
                "emits a clear-text key-exchange message on the channel when members are added"
            ); //, async () => {
            it.todo(
                "forwards kEx messages with limited keys (->messages or -> peers test)"
            ); //, async () => {
            it.todo(
                "continues processing messages that used the prior key (->messages or -> peers test)"
            ); //, async () => {
        });
    });
});
