import Redis from "ioredis";


export class RedisScanner {
  match: string;
  count: number;
  redis: Redis.Redis;
  stream: any;
  aborted = false;
  constructor(redis: Redis.Redis, match: string, count: number = 1000) {
    this.redis = redis;
    this.match = match;
    this.count = count;
    return this;
  }
  abort() {
    this.aborted = true;
  }
  async scanByKey(keyCallback: (key: string) => Promise<void>): Promise<void> {
    return this.scanBatches(async (keys: string[]) => { 
      for (const key of keys) {
        await keyCallback(key);
      }
    })
  }
  async scanBatches(batchCallback: (keys: string[]) => Promise<void>): Promise<void> {
    const stream = (this.stream = this.redis.scanStream({
      match: this.match,
      count: this.count,
    }));
    const dataPromises = new Set<Promise<any>>();
    await new Promise((res) => {
      stream.on("data", (keys: string[]) => {
        stream.pause();
        const callbackUnderway = new Promise(async (res2) => {
          await batchCallback(keys);
          dataPromises.delete(callbackUnderway);

          if (this.aborted) {
            // synthetic end (abandon / do not resume scanning)
            Promise.all(dataPromises).then(res);
          } else {
            stream.resume();
          }
          res2(null);
        });
        dataPromises.add(callbackUnderway);
      });

      stream.on("end", () =>
        //prettier-ignore
        Promise.all(dataPromises).
          then(res)
      );
    });
  }
}
