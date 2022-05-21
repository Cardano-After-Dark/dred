import express, { Express } from "express";
import Redis from "ioredis";
import { RedisSet } from "../redis/RedisSet";
const redis: Redis.Redis = new Redis();
export interface ExpressWithRedis extends Express {
  redis:  null | Redis.Redis;
}


export async function createServer() {
    const api = express();
    api.set("redis", redis);

  api.use(express.json({}));
  const channelList = new RedisSet(redis, "channels");
  const messagesInChannel = new RedisSet(redis);

  api.post("/channel/:channelId", async (req, res, next) => {
    const { channelId } = req.params;
    // console.log({ channelId });
    const found = await channelList.has(channelId);
    if (found) {
        res.status(400).json({ error: "channel already exists" })
        return next();
    }
    await channelList.add(channelId);
    res.json({
      id: channelId,
      status: "created",
    });
    next();
  });

  api.post("/channel/:channelId/message", async (req, res, next) => {
    const { channelId } = req.params;
    const found = await channelList.has(channelId);
    if (!found) {
      res.status(404).json({ error: "channel not found" });
      return next();
    }

    res.json({ status: "created" });
    next();
  });

  return api;
}
