import { createServer } from "./server";
import { Express } from "express";
import { Server } from "http";
import supertest from "supertest";
import Redis from "ioredis";

let app: Express;
let server  : Server;

afterAll(async () => {
  app && app.get("redis").disconnect();
  server && server.close();
});

export async function testServer() {
    app = app || await createServer();
  
    const server = app.listen();
    const agent = supertest.agent(server);
    return { agent, app }
}
