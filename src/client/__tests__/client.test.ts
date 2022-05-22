import { DredServer } from "../../server";
import { DredClient } from "../../client";
import { testSetup } from "../../server/testServer";

describe("Dred client", () => {
    let server: DredServer, agent, client: DredClient;
    beforeAll(async () => {
        const test = await testSetup();
        ({ server, client, agent } = test);
    });

    it("does createChannel() on server", async () => {
        const serverMethod = jest.spyOn(server, "createChannel");
        const chanName = "hiThere";
        await client.createChannel(chanName);
        expect(server.channelList.has(chanName)).toBeTruthy()
        expect(serverMethod).toHaveBeenCalled();
    });
});
