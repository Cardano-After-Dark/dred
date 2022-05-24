import { DredServer } from "../../server";
import { DredClient } from "../../client";
import { testSetup } from "../../server/testServer";

describe("Dred client", () => {
    let server: DredServer, agent, client: DredClient;
    beforeAll(async () => {
        const test = await testSetup();
        ({ server, client, agent } = test);
    });

    describe("createChannel", () => {
        it("does createChannel() on server", async () => {
            const serverMethod = jest.spyOn(server, "createChannel");
            const chanName = "hiThere";
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
            const chanName = "hiThere";
            await expect(client.createChannel(chanName)).rejects.toThrow(
                "some error"
            );
        });
    });

    describe("subscribeChannel", () => {
        it("keeps a list of callbacks for each channel", async () => {
            const chan = "subscribeTest";

            const callback1 = function () {};
            const callback2 = function () {};
            client.subscribeChannel(chan, callback1);
            client.subscribeChannel(chan, callback2);
            const subs = client.subscriptions.get(chan);
            expect(subs).toMatchObject([callback1, callback2]);
        });
    });
});
