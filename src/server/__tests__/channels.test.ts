// import request from 'supertest';
import { Express } from "express";
import { SuperTestWithHost, Test } from "supertest";
import { DredClient } from "../../client";

import nacl from "tweetnacl";
const { sign } = nacl;
import util from "tweetnacl-util";
const { encodeUTF8, decodeUTF8, encodeBase64, decodeBase64 } = util;

import { testSetup } from "../testServer";
import { DredServer } from "src/server/DredServer";

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
            key = sign.keyPair();
            pubKey = key.publicKey;
            debugger;
            pubKeyString = encodeBase64(pubKey);
        });
        it("refuses to create a channel without a provided 'owner' pubKey and valid signature", async () => {
            const channelName = "encChannel3";
            console.log("no owner");
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

            console.log("no sig");
            let noSig = await agent
                .post(`/channel/${channelName}`)
                .send({
                    encrypted: true,
                    allowInvites: true,
                    owner: pubKey,
                })
                .expect("Content-Type", /json/)
                .expect(400);

            expect(noSig.body.error).toMatch(/missing signature/);

            console.log("bad sig");
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
            const chanBuf = decodeUTF8(channelName);
            const signature = encodeBase64(sign(chanBuf, key.secretKey));
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
        it("doesn't allow extra keys in channel options", async () => {
            const channelName = "enc-chan-creation-no-extra-stuff";
            const chanBuf = decodeUTF8(channelName);
            const signature = encodeBase64(sign(chanBuf, key.secretKey));
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
            expect(options.randomValue).toBeUndefined();
        });

        it.todo(
            "fills createdAt, ignoring any client-provided value"
            // async () => {}
        );
        describe("members", () => {
            it.todo(
                "allows owner to join others with their pubKey"
                // async () => {}
            );
            it.todo(
                "allows members to join others with approveJoins: 'members' "
                // async () => {}
            );
            describe("requests", () => {
                it.todo(
                    "denies join requests by default"
                    // async () => { }
                );
                it.todo(
                    "allows any join requests to be added if allowJoining is enabled"
                    // async () => {}
                );
            });
            describe("beyond memberLimit:", () => {
                // use allowJoining, approvJoins: member
                it.todo(
                    "can be added by owner"
                    // async () => { }
                );
                it.todo(
                    "joins fail for members"
                    // async () => { }
                );
                it.todo(
                    "joins fail for regular users"
                    // async () => { }
                );
            });
        });
    });
});
