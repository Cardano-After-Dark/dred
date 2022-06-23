import Redis from "ioredis";

type keyType = "_abstract" | string;

export class RedisSet {
    redis: Redis;
    key: keyType;
    abstract: boolean;
    constructor(redis: Redis, key: keyType = "_abstract") {
        this.redis = redis;
        this.key = key;
        this.abstract = !!(key === "_abstract");
    }
    async has(key: string, setName?: string) {
        if (this.abstract && !setName)
            throw new Error(`abstract RedisSet requires setName in arg2`);
        return this.redis.call("SISMEMBER", setName || this.key, key);
    }
    async add(key: string, setName?: string) {
        if (this.abstract && !setName)
            throw new Error(`abstract RedisSet requires setName in arg2`);
        return this.redis.call("SADD", this.key, key);
    }
    async delete(key: string, setName?: string) {
        if (this.abstract && !setName)
            throw new Error(`abstract RedisSet requires setName in arg2`);
        return this.redis.call("SREM", this.key, key);
    }
}
