import Redis from "ioredis";

type keyType = "_abstract" | string;
interface ValueAdapter<V> {
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
export class RedisHash<K extends { toString(): string }, V = string> {
    redis: Redis;
    key: keyType;
    abstract: boolean;
    adapter: ValueAdapter<V>;
    constructor(redis: Redis, key: string, adapter: ValueAdapter<V>) {
        this.redis = redis;
        this.key = key;
        this.adapter = adapter;
        this.abstract = !!(key === "_abstract");
    }
    async get(key: K, hashName?: string): Promise<V> {
        if (this.abstract && !hashName)
            throw new Error(`abstract RedisHash requires hash-name in arg2`);

        const hName = hashName || this.key;
        const str = (await this.redis.call(
            "HGET",
            hName,
            key.toString()
        )) as string;
        const parsed = this.adapter.fromRedis(str);
        return parsed;
    }
    async set(key: K, value: V, setName?: string) {
        if (this.abstract && !setName)
            throw new Error(`abstract RedisSet requires setName in arg3`);

        const v = this.adapter.toRedis(value);
        return this.redis.call("HSET", this.key, key.toString(), v);
    }
    async delete(key: K, setName?: string) {
        if (this.abstract && !setName)
            throw new Error(`abstract RedisSet requires setName in arg2`);

        return this.redis.call("HDEL", this.key, key.toString());
    }
}
