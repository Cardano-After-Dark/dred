import { DredServer } from "../../server";
import { DredClient } from "../../client";
import { testSetup } from "../../server/testServer";
import { asyncDelay } from "../../util/asyncDelay";

describe("Dred client", () => {
    let server: DredServer, agent, client: DredClient;
    beforeAll(async () => {
        const test = await testSetup();
        ({ server, client, agent } = test);
    });

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
                .mockImplementation((req, res, next) => {
                    res.status(400).json({ error: "some error" });
                    next();
                });
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
    });
});
