import Redis from "ioredis";

type keyType = "_abstract" | string;

export class RedisSet {
  redis: Redis.Redis;
  key: keyType;
  abstract: boolean;
  constructor(redis: Redis.Redis, key: keyType = "_abstract") {
    this.redis = redis;
    this.key = key;
    this.abstract = !!(key === "_abstract");
  }
  async has(key: string, setName?: string) {
    if (this.abstract && !setName)
      throw new Error(`abstract RedisSet requires setName in arg2`);
    return this.redis.send_command("SISMEMBER", setName || this.key, key);
  }
  async add(key: string, setName?: string) {
    if (this.abstract && !setName)
      throw new Error(`abstract RedisSet requires setName in arg2`);
    return this.redis.send_command("SADD", this.key, key);
  }
  async delete(key: string, setName?: string) {
    if (this.abstract && !setName)
      throw new Error(`abstract RedisSet requires setName in arg2`);
    return this.redis.send_command("SREM", this.key, key);
  }
}