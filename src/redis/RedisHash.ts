import { Redis } from "ioredis";

type keyType = "_abstract" | string;
export interface ValueAdapter<V> {
    toRedis: (v: V) => string;
    fromRedis: (v: string) => V;
}
export const StringValueAdapter: ValueAdapter<string> = {
    toRedis(v: string) {
        return v;
    },
    fromRedis(v: string) {
        return v;
    },
};
export const JSONValueAdapter: ValueAdapter<object> = {
    toRedis(v: object) {
        return JSON.stringify(v);
    },
    fromRedis(v: string) {
        return JSON.parse(v);
    },
};
export class RedisHash<KEYTYPE extends { toString(): string }, VALUETYPE = string> {
    redis: Redis;
    hashName: keyType;
    abstract: boolean;
    adapter: ValueAdapter<VALUETYPE>;
    constructor(redis: Redis, hashName: string, adapter: ValueAdapter<VALUETYPE>) {
        this.redis = redis;
        this.hashName = hashName;
        this.adapter = adapter;
        this.abstract = !!(hashName === "_abstract");
    }
    async get(key: KEYTYPE, hashName?: string): Promise<VALUETYPE> {
        if (this.abstract && !hashName)
            throw new Error(`abstract RedisHash requires hashName in arg2`);

        const hName = hashName || this.hashName;
        const str = (await this.redis.call(
            "HGET",
            hName,
            key.toString()
        )) as string;
        const parsed = this.adapter.fromRedis(str);
        return parsed;
    }

    async has(key: KEYTYPE, hashName? : string) {
        const hName = hashName || this.hashName;
        const v = await this.get(key, hName)
        return !!v
    }

    async keys(hashName?: string) {
        if (this.abstract && !hashName)
            throw new Error(`abstract RedisHash requires hashName in arg1`);

            const hName = hashName || this.hashName;
            return this.redis.call("HKEYS", hName);
    }

    async set(key: KEYTYPE, value: VALUETYPE, hashName?: string) {
        if (this.abstract && !hashName)
            throw new Error(`abstract RedisHash requires hashName in arg3`);

        const hName = hashName || this.hashName;
        const v = this.adapter.toRedis(value);
        return this.redis.call("HSET", hName, key.toString(), v);
    }

    async delete(key: KEYTYPE, hashName?: string) {
        if (this.abstract && !hashName)
            throw new Error(`abstract RedisHash requires hashName in arg2`);

        const hName = hashName || this.hashName;
        return this.redis.call("HDEL", hName, key.toString());
    }
}
