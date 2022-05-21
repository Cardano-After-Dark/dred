import Redis from "ioredis";

type keyType = "_abstract" | string;

export class RedisHash<K extends { toString(): string }, V = string> {
  redis: Redis.Redis;
  key: keyType;
  abstract: boolean;
  constructor(redis: Redis.Redis, key: string) {
    this.redis = redis;
    this.key = key;
    this.abstract = !!(key === "_abstract");
  }
  async get(key: K, setName?: string): Promise<V> {
    if (this.abstract && !setName)
      throw new Error(`abstract RedisSet requires setName in arg2`);
    return this.redis.send_command("HGET", this.key, key.toString());
  }
  async set(key: K, value: V, setName?: string) {
    if (this.abstract && !setName)
      throw new Error(`abstract RedisSet requires setName in arg3`);

    return this.redis.send_command(
      "HSET",
      this.key,
      key.toString(),
      value as any
    );
  }
  async delete(key: K, setName?: string) {
    if (this.abstract && !setName)
      throw new Error(`abstract RedisSet requires setName in arg2`);

    return this.redis.send_command("HDEL", this.key, key.toString());
  }
}
