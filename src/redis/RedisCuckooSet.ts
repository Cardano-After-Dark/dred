import Redis from "ioredis";

type CuckooSettings {
  
}

export class RedisCuckooSet {
  redis: Redis.Redis;
  key: string;
  constructor(redis, key, settings: CuckooSettings) {
    this.redis = redis;
    this.key = key;
  }
  async has(key: string) {
    return this.redis.send_command("SISMEMBER", this.key, key);
  }
  async add(key: string) {
    return this.redis.send_command("SADD", this.key, key);
  }
  async delete(key: string) {
    return this.redis.send_command("SREM", this.key, key);
  }
}
