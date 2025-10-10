import { Redis } from "ioredis";

type CuckooSettings = {
    initialCapacity: number;
}

export class RedisCuckooSet {
  redis: Redis;
  key: string;
  settings: CuckooSettings;
  disconnected = false;
  constructor(redis: Redis, key: string, settings: CuckooSettings) {
    this.redis = redis.duplicate();
    this.key = key;
    this.settings = settings
    this.redis.call("CF.RESERVE", this.key, settings.initialCapacity)
  }
  async has(key: string) {
    this.assertOk();

    return this.redis.call("CF.EXISTS", this.key, key);
  }
  async add(key: string) {
    this.assertOk();
    return this.redis.call("CF.ADD", this.key, key);
  }
  async addIfNeeded(key: string) {
    this.assertOk();
    return this.redis.call("CF.ADDNX", this.key, key);
  }
  async count(key:string) {
    this.assertOk();
    return this.redis.call("CF.COUNT", this.key, key);
  }
  async delete(key: string) {
    this.assertOk();
    return this.redis.call("CF.DELETE", this.key, key);
  }
  async info(key: string) {
    this.assertOk();
    return this.redis.call("CF.INFO", this.key, key);
  }
  async cleanup() {
    this.disconnected = true;
    this.redis.removeAllListeners();
    return this.redis.disconnect();
  }
  assertOk() {
    if (this.disconnected)
      throw new Error(`RedisCuckooSet ${this.key} is disconnected`);
  }
}
