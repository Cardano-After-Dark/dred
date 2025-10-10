import { Redis } from "ioredis";

type keyType = "_abstract" | string;

/**
 * A wrapper around the Redis set data type
 *
 * NOTE: In the future we might want to use the Redis
 * set data type directly, to use proper parameters.
 * e.g. `redis.sadd(setName || this.key, key)` instead of `redis.call("SADD", setName || this.key, key)`
 * see: https://redis.io/docs/latest/commands/sadd/
 */
export class RedisSet {
    redis: Redis;
    key: keyType;
    abstract: boolean;
    disconnected = false
    constructor(redis: Redis, key: keyType = "_abstract") {
        this.redis = redis.duplicate();
        this.key = key;
        this.abstract = !!(key === "_abstract");
    }

    async has(key: string, setName?: string) {
        this.assertOk(setName);

        return this.redis.call("SISMEMBER", setName || this.key, key);
    }
    async add(key: string, setName?: string) {
        this.assertOk(setName);

        if (this.abstract && !setName)
            throw new Error(`abstract RedisSet requires setName in arg2`);
        return this.redis.call("SADD", setName || this.key, key);
    }
    async delete(key: string, setName?: string) {
        this.assertOk(setName);

        if (this.abstract && !setName)
            throw new Error(`abstract RedisSet requires setName in arg2`);
        return this.redis.call("SREM", setName || this.key, key);
    }

    assertOk(setName?: string) {
        if (this.disconnected)
            throw new Error(`RedisSet ${this.key} is disconnected`);
        if (this.abstract && !this.key && !setName  )
            throw new Error(`abstract RedisSet requires key in last arg`);
    }

    async cleanup() {
        this.disconnected = true;
        this.redis.removeAllListeners();
        return this.redis.disconnect();
    }

}
