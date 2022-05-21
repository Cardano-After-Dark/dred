import { createServer } from "./server";
import { Express } from "express";
import { Server } from "http";
import supertest from "supertest";
import Redis from "ioredis";

let app: Express;
let server: Server;

afterAll(async () => {
  const redis = app && app.get("redis");
  redis.disconnect();
  server && server.close();
});
afterEach(async () => {
  const redis: Redis.Redis = app && app.get("redis");

  await redis.flushdb();
  // const stream = redis.scanStream();
  // stream.on("data", (resultKeys) => {

  // });
});

export async function testServer() {
  app = app || (await createServer());

  const server = app.listen();
  const agent = supertest.agent(server);
  return { agent, app };
}
