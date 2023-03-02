import Redis from "ioredis";

type CuckooSettings = {
    initialCapacity: number;
}

export class RedisCuckooSet {
  redis: Redis.Redis;
  key: string;
  settings: CuckooSettings;
  constructor(redis, key, settings: CuckooSettings) {
    this.redis = redis;
    this.key = key;
    this.settings = settings
    this.redis.call("CF.RESERVE", this.key, settings.initialCapacity)
  }
  async has(key: string) {
    return this.redis.call("CF.EXISTS", this.key, key);
  }
  async add(key: string) {
    return this.redis.call("CF.ADD", this.key, key);
  }
  async addIfNeeded(key: string) {
    return this.redis.call("CF.ADDNX", this.key, key);
  }
  async count(key:string) {
    return this.redis.call("CF.COUNT", this.key, key);
  }
  async delete(key: string) {
    return this.redis.call("CF.DELETE", this.key, key);
  }
  async info(key: string) {
    return this.redis.call("CF.INFO", this.key, key);
  }
}
