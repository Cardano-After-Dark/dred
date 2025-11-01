import 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import Redis, { Redis as Redis$1 } from 'ioredis';
import { customAlphabet } from 'nanoid';
import { v4 } from 'uuid';
import * as abstractLoggingInterface from 'abstract-logging';
import fetch$1 from 'cross-fetch';
import nacl from 'tweetnacl';
import util from 'tweetnacl-util';
import { EventEmitter } from 'eventemitter3';
import { contextLogger, autobind, zonedLogger, StateMachine as StateMachine$1, asyncDelay as asyncDelay$1 } from '@poshplum/utils';
import { ReadableStream as ReadableStream$1 } from 'node:stream/web';
import { Readable } from 'node:stream';
import { sign as sign$1, verify, newKeyPair } from 'watsign';
import { GenericSigner, TxBatcher, bytesToText } from '@donecollectively/stellar-contracts';
import { makeBlockfrostV0Client, makeRandomRootPrivateKey, bytesToHex, makeRootPrivateKey, hexToBytes, makeSimpleWallet, DredCapo } from 'dred-network-registry';

const nanoid = customAlphabet("0123456789abcdefghjkmnpqrstvwxyz", 10);

const sep = {
  HASH: "#",
  STREAM: "|",
  INDEX: ":",
  OPEN: "[",
  CLOSE: "]",
  BIND: "-"
};
Object.freeze(sep);
const shards32 = [
  "{10}",
  "{113}",
  "{21}",
  "{3}",
  "{61}",
  "{72}",
  "{50}",
  "{43}",
  "{11}",
  "{112}",
  "{20}",
  "{2}",
  "{60}",
  "{73}",
  "{51}",
  "{42}",
  "{12}",
  "{111}",
  "{23}",
  "{1}",
  "{63}",
  "{70}",
  "{52}",
  "{41}",
  "{13}",
  "{110}",
  "{22}",
  "{0}",
  "{62}",
  "{71}",
  "{53}",
  "{40}"
];
const shards64 = [
  "{10}",
  "{18}",
  "{113}",
  "{342}",
  "{29}",
  "{21}",
  "{3}",
  "{122}",
  "{69}",
  "{61}",
  "{72}",
  "{162}",
  "{50}",
  "{58}",
  "{153}",
  "{43}",
  "{11}",
  "{19}",
  "{112}",
  "{343}",
  "{28}",
  "{20}",
  "{2}",
  "{123}",
  "{68}",
  "{60}",
  "{73}",
  "{163}",
  "{51}",
  "{59}",
  "{152}",
  "{42}",
  "{12}",
  "{102}",
  "{111}",
  "{119}",
  "{133}",
  "{23}",
  "{1}",
  "{9}",
  "{173}",
  "{63}",
  "{70}",
  "{78}",
  "{52}",
  "{142}",
  "{49}",
  "{41}",
  "{13}",
  "{103}",
  "{110}",
  "{118}",
  "{132}",
  "{22}",
  "{0}",
  "{8}",
  "{172}",
  "{62}",
  "{71}",
  "{79}",
  "{53}",
  "{143}",
  "{48}",
  "{40}"
];
const shards = {
  32: shards32,
  64: shards64
};
Object.freeze(shards);
const opt = {
  // Channels options
  CHANNELS: "channels",
  LOG: "log",
  OVERFLOW: "overflow",
  SCHEMA: "schema",
  SLOTS: "slots",
  VESRION: "version",
  APPLICATION: "application",
  SHARDED: "sharded",
  // Redis options
  REDIS: "redis",
  NODES: "nodes",
  URL: "url"
};
Object.freeze(opt);
const tun = {
  TEAM: "team",
  CONNECTION: "connection",
  CONSUMER: "consumer",
  KEY: "key"
};
Object.freeze(tun);
const msg = {
  ID: "id",
  DATA: "data"
};
Object.freeze(msg);
const pre = {
  KEYS: "keys",
  SHARDS: "shards"
};
Object.freeze(pre);
const overflowStreamElemNumber = 100;
const blockStreamConsumerTimeOutMs = 1e4;
const maxMessageStreamConsumePerRun = 100;
const defaultAppName = "app";
const defaultVersion = 1;
const defaultSlotsNumb = 32;
const defaultSchema = "channels";
const defaultOriginType = "all";

class RedisChannelsError extends Error {
  constructor(message, error = null) {
    super(message);
    this.error = error;
    Error.captureStackTrace(this, RedisChannelsError);
  }
}

function redisFieldsToHash(a) {
  //! converts a flat list of keys into a hash of the keys & primitive values.
  const result = {};
  for (let i = 0; i < a.length; i += 2) {
    result[a[i]] = a[i + 1];
  }
  return result;
}
function hashToRedisFields(h) {
  const r = [];
  for (const [k, v] of Object.entries(h)) {
    r.push(k, v);
  }
  return r;
}
class RedisChannels {
  constructor(options = {}) {
    let { channels, redis } = options;
    channels = channels || {};
    this._nonBlockRedisClient = this._createRedisClient(redis);
    this._consumers = {};
    this.closing = false;
    this._workInTeam = false;
    this._consumerIsGennerated = true;
    if (typeof channels[opt.LOG] === "undefined") {
      this.logger = { ...abstractLoggingInterface };
    } else {
      this.logger = channels[opt.LOG];
    }
    if (typeof channels[opt.OVERFLOW] === "undefined" || Number.isInteger(channels[opt.OVERFLOW]) === false) {
      this._overflow = overflowStreamElemNumber;
    } else {
      this._overflow = channels[opt.OVERFLOW];
    }
    if (typeof channels[opt.SLOTS] === "undefined") {
      this._slots = defaultSlotsNumb;
    } else {
      if (channels[opt.SLOTS] !== 32 && channels[opt.SLOTS] !== 64) {
        throw new RedisChannelsError(
          "Invalid shards: " + channels[opt.SLOTS] + "allowed values are 32 or 64."
        );
      }
      this._slots = channels[opt.SLOTS];
    }
    if (typeof channels[opt.SHARDED] === "undefined") {
      this._sharded = false;
    } else {
      this._sharded = channels[opt.SHARDED];
    }
    let schema = defaultSchema;
    if (typeof channels[opt.SCHEMA] !== "undefined") {
      schema = channels[opt.SCHEMA];
    }
    let version = defaultVersion;
    if (typeof channels[opt.VESRION] !== "undefined") {
      version = channels[opt.VESRION];
    }
    let application = defaultAppName;
    if (typeof channels[opt.APPLICATION] !== "undefined") {
      application = channels[opt.APPLICATION];
    }
    this._prefix = application + sep.BIND + schema + sep.BIND + version;
    if (this._sharded) {
      this._keyHash = this._prefix + sep.HASH + pre.KEYS + shards[this._slots][0] + sep.OPEN + 0 + sep.CLOSE;
      this._keyZset = this._prefix + sep.INDEX + pre.SHARDS + shards[this._slots][0] + sep.OPEN + 0 + sep.CLOSE;
    }
    this.logger.debug("created dred streamer", {
      sharded: this._sharded,
      overflow: this._overflow,
      slots: this._slots,
      prefix: this._prefix
    });
  }
  /*
   * Returns a tunnel object to access the channel for a particular group.
   *
   * It creates all related data in the Redis DB initially if necessary.
   *
   * Parameters:
   *
   * group - a string with the group id
   *
   * Returns a tunnel object with a builded stream 'key'.
   *
   * {key: <prefix>{<hash_slot>}<group>[<shard_id>]}
   *
   * On error throws an exception.
   *
   */
  // --------------------------------------------------------------------------|
  async use(group) {
    try {
      if (this._sharded === false) {
        return {
          [tun.KEY]: this._prefix + sep.STREAM + group
        };
      }
      let keyStream = await this._nonBlockRedisClient.hget([
        this._keyHash,
        group
      ]);
      if (keyStream !== null) {
        return {
          [tun.KEY]: keyStream
        };
      }
      let shard = await this._nonBlockRedisClient.zrangebyscore([
        this._keyZset,
        "-inf",
        "+inf",
        "WITHSCORES",
        "LIMIT",
        "0",
        "1"
      ]);
      if (shard.length === 0) {
        await this._initShardScores();
        shard = await this._nonBlockRedisClient.zrangebyscore([
          this._keyZset,
          "-inf",
          "+inf",
          "WITHSCORES",
          "LIMIT",
          "0",
          "1"
        ]);
      }
      const [set] = shard;
      keyStream = this._prefix + sep.STREAM + shards[this._slots][set] + group + sep.OPEN + set + sep.CLOSE;
      await this._nonBlockRedisClient.hset([
        this._keyHash,
        group,
        keyStream
      ]);
      await this._nonBlockRedisClient.zincrby([this._keyZset, 1, set]);
      return { [tun.KEY]: keyStream };
    } catch (error) {
      this.logger.error("Use error: %o", error);
      throw new RedisChannelsError(
        "Can not call use for a group : " + group + " with sharded mode = " + this._sharded,
        error
      );
    }
  }
  /*
   * Deletes a group and all related data in a Redis DB.
   *
   * On error throws an exception.
   */
  // --------------------------------------------------------------------------|
  async delete(group) {
    try {
      let keyStream = this._prefix + sep.STREAM + group;
      this.logger.debug("deleting group", {
        group,
        keyStream
      });
      if (this._sharded === false) {
        for (const i in this._consumers) {
          if (this._consumers[i][tun.KEY] === keyStream) {
            await this.unsubscribe(this._consumers[i]);
          }
        }
        await this._nonBlockRedisClient.del([
          this._prefix + sep.STREAM + group
        ]);
        return;
      }
      keyStream = await this._nonBlockRedisClient.hget([
        this._keyHash,
        group
      ]);
      for (const i in this._consumers) {
        if (this._consumers[i][tun.KEY] === keyStream) {
          await this.unsubscribe(this._consumers[i]);
        }
      }
      const slot = keyStream.match(/\[([0-9]+)\]$/)[1];
      await this._nonBlockRedisClient.del([keyStream]);
      await this._nonBlockRedisClient.hdel([this._keyHash, group]);
      await this._nonBlockRedisClient.zincrby([this._keyZset, -1, slot]);
    } catch (error) {
      this.logger.error("Delete error: %o", error);
      throw new RedisChannelsError(
        "Can not delete  a group : " + group + " with sharded mode = " + this._sharded,
        error
      );
    }
  }
  /*
   * Subscribes for a tunnel
   *
   * It creates a Redis clinet (for a blocking connection), a consumer,
   * a consumer group and a stream to access the tunnel.
   *
   * Paramters:
   *
   * tunnel - a tunnel object to use.
   *
   * team - a name (string) of the consumer group. If not specified, every
   *        consumer consumer will be its own unique team
   *
   * consumer - a unique consumer name (string) within a team . If not specified
   *            a UUID version 4 will be generated.
   *
   * A subscription is necessary only for a consumer, not for a producer.
   *
   * On error throws an exception.
   */
  // --------------------------------------------------------------------------|
  async subscribe(tunnel, team, consumer) {
    try {
      this.logger.debug(" -- subscribing", {
        tunnel,
        team,
        consumer
      });
      if (typeof tunnel === "undefined" || typeof tunnel[tun.KEY] === "undefined") {
        throw new RedisChannelsError(
          "Can not subscribe, no valid tunnel object"
        );
      }
      if (typeof consumer === "undefined") {
        tunnel[tun.CONSUMER] = v4().replace(/-/g, "");
        this._consumerIsGennerated = true;
      } else {
        tunnel[tun.CONSUMER] = consumer;
        this._consumerIsGennerated = false;
      }
      if (typeof team === "undefined") {
        tunnel[tun.TEAM] = tunnel[tun.CONSUMER];
        this._workInTeam = false;
      } else {
        tunnel[tun.TEAM] = team;
        this._workInTeam = true;
      }
      const consumerGroup = tunnel[tun.TEAM];
      try {
        this.logger.debug(" -- ensuring stream exists", tunnel[tun.KEY]);
        await this._nonBlockRedisClient.xgroup([
          "CREATE",
          tunnel[tun.KEY],
          consumerGroup,
          "$",
          "MKSTREAM"
        ]);
        this.logger.debug(`  -- dropping temp group for ${consumerGroup} `);
        await this._deleteRedisConsumerAndGroup(tunnel);
      } catch {
      }
      if (!(tunnel[tun.CONSUMER] in this._consumers)) {
        tunnel[tun.CONNECTION] = this._duplicateRedisClient();
        this._consumers[tunnel[tun.CONSUMER]] = tunnel;
      }
    } catch (error) {
      this.logger.error("Subscribe error: %o", error);
      throw error;
    }
  }
  /*
   * Unsubscribes a tunnel.
   *
   * On error throws an exception.
   */
  // --------------------------------------------------------------------------|
  async unsubscribe(tunnel) {
    try {
      this.logger.debug(" -- unsubscribing", {
        tunnel: {
          key: tunnel[tun.KEY],
          team: tunnel[tun.TEAM],
          consumer: tunnel[tun.CONSUMER]
        }
      });
      if (typeof tunnel === "undefined" || typeof tunnel[tun.TEAM] === "undefined" || typeof tunnel[tun.CONSUMER] === "undefined") {
        throw new RedisChannelsError(
          "Can not unsubscribe, no valid tunnel object"
        );
      }
      const { [tun.TEAM]: team, [tun.CONSUMER]: consumer } = tunnel;
      const fields = {
        _action: "unsubscribe",
        _team: team,
        _consumer: consumer
      };
      const f = hashToRedisFields(fields);
      this.logger.debug(" -- adding redundant unsubscribe message", {
        key: tunnel[tun.KEY],
        team,
        consumer,
        fields
      });
      await this._nonBlockRedisClient.xadd([
        tunnel[tun.KEY],
        "MAXLEN",
        "~",
        this._overflow,
        "*",
        ...f
      ]);
    } catch (error) {
      this.logger.error("Unsubscribe error: %o", error);
      if (this.closing) {
        this.logger.error(" ... ^^ after channels shutdown");
        return;
      }
      if (error instanceof RedisChannelsError) {
        throw error;
      }
      throw new RedisChannelsError(
        "Can not unsubscribe for consumer : " + tunnel[tun.CONSUMER],
        error
      );
    }
  }
  /*
   * Produces a message in a channel with a given tag for the type of message.
   *
   * Parameters:
   *
   * tunnel - a tunnel object (result form use)
   *
   * message - a string, message to produce.  Stored as a 'data'  key in the 
   *          RedisStreams message.
   *
   * options: an object.  its keys and values are included in the RedisStreams 
   *          message.  
   *
   * options.type - a string, can be used to distinguish between message sources.
   *        Default value is 'all'.  Stored as _type in RedisStreams.
   *
   * Returns the id of the produced message
   *
   * On error throws an error
   */
  // --------------------------------------------------------------------------|
  async produce(tunnel, message, { _type = defaultOriginType, ...appFields } = {}) {
    try {
      const data = message;
      const redisFields = hashToRedisFields({
        _type,
        _data: data,
        ...appFields
      });
      const id = await this._nonBlockRedisClient.xadd([
        tunnel[tun.KEY],
        "MAXLEN",
        "~",
        this._overflow,
        "*",
        ...redisFields
      ]);
      return id;
    } catch (error) {
      this.logger.error("Produce error:", error.stack || error.message || JSON.stringify(error));
      this.logger.error(" ... while sending message", message);
      if (this.closing) {
        this.logger.error(" ... ^^ after channels shutdown");
        return;
      }
      debugger;
      throw new RedisChannelsError(
        "Can not produce in the tunnel: " + tunnel,
        error
      );
    }
  }
  /*
   * Consumes messages for a given type from a tun.
   *
   * It is an asynchronous iterator, returns an array of messages.
   * Every message is an object {id: <string>, data: <string>, ...appAttrs},
   * where appAttrs are any additional keys and values provided in arg3 
   * to the produce() method
   *
   * Parameters:
   *
   * tunnel - a tunnel object (result form use)
   *
   * type - a string, can be used to distinguish between message sources.
   *        Default value is 'all'.
   *
   * count  - a maximum number of messages consumed per iteration.
   *          Default value is 100.
   *
   * timeout  - a blocking timeout in milliseconds. Default value is 10000.
   *            If a blocking timeout is 0 a consumer will block forever.
   *
   * fromId - start consuming messages newer then a given id. Default value
   *          is set to '>' or '*' whether if it is consumed in a team or not.
   *          This means staring form messages that were never
   *          delivered to any other consumer.
   *          The format is <time-in-milisecounds>-<sequence> or only the
   *          miliseconds part of the id.
   *
   * messageOnTimeOut - a bollean flag. If set, in a case of a timeout a
   *         message array [{id: <last-consumed-id> data: null}] will be
   *         returned to indecate it. If there were no consumed messages
   *         the id value will be undefined. Default value is false.
   * -----------------------------------------------------------------------
   * TODO!!
   * -----------------------------------------------------------------------
   * acknowledge - a boolean flag. If it is set to true an explicite
   *               confirmation (call of an acknowledge method) after a
   *               successful processing is required. If set to false
   *               an acknowledgement is performed automatically.
   *               The value makes seanse when consuming in a team.
   *
   *
   * Important!!!
   *
   * If the acknowledge flag is set a call of an acknowledge method is
   * required after a successful processing. Otherwise the number of pending
   * messages in the Redis will grow and will ocuppy a valuable memory.
   * -----------------------------------------------------------------------
   *
   * On error throws an exeption
   *
   * Note:
   *
   * The method processes messages containg controlling context (for example
   * a command to unsubscribe and finsh with a processing).
   *
   * If a consumers are working in a team it is possible that one consumer
   * gets two 'unsubscrbe' messages. After the processing of the fisrt it will
   * just finish. In this case some other consumer in a team will not
   * recieve his 'unsubscribe' message.
   *
   * In this case a consumer should produce back all 'unsubscribe' messages,
   * which should be recieved by all outher consumers within the same team.
   */
  // --------------------------------------------------------------------------|
  async *consume(tunnel, targetType = defaultOriginType, count = maxMessageStreamConsumePerRun, timeout = blockStreamConsumerTimeOutMs, fromId = ">", messageOnTimeOut = false) {
    try {
      this.logger.debug(" -- consuming", {
        tunnel: {
          key: tunnel[tun.KEY],
          team: tunnel[tun.TEAM],
          consumer: tunnel[tun.CONSUMER]
        },
        targetType,
        count,
        timeout,
        fromId,
        messageOnTimeOut
      });
      let unsubscribing = false;
      let currentId = fromId;
      let lastId;
      if (fromId === ">" && this._workInTeam === false) {
        currentId = "$";
      }
      while (!this.closing) {
        const result = [];
        let data;
        if (this._workInTeam === false) {
          data = await this._consumers[tunnel[tun.CONSUMER]][tun.CONNECTION].xread([
            "COUNT",
            count,
            "BLOCK",
            timeout,
            "STREAMS",
            tunnel[tun.KEY],
            currentId
          ]);
        } else {
          data = await this._consumers[tunnel[tun.CONSUMER]][tun.CONNECTION].xreadgroup([
            "GROUP",
            tunnel[tun.TEAM],
            tunnel[tun.CONSUMER],
            "COUNT",
            count,
            "BLOCK",
            timeout,
            "NOACK",
            "STREAMS",
            tunnel[tun.KEY],
            currentId
          ]);
        }
        if (data === null) {
          if (this._workInTeam === false) {
            await this._consumers[tunnel[tun.CONSUMER]][tun.CONNECTION].xinfo(["STREAM", tunnel[tun.KEY]]);
          }
          if (messageOnTimeOut) {
            result.push({
              [msg.ID]: lastId,
              [msg.DATA]: null
            });
            yield result;
          }
          continue;
        }
        for (const stream of data) {
          for (const [id, f] of stream[1]) {
            const fields = redisFieldsToHash(f);
            const {
              _type,
              _data,
              _team,
              _action,
              _consumer,
              ...appAttrs
            } = fields;
            const unsubscribe = "unsubscribe" === _action;
            if (_action && !unsubscribe) throw new Error(`bad _action value in message`);
            if (_team && !unsubscribe) throw new Error(`_team is only valid for _action=unsubscribe messages`);
            if (_consumer && !unsubscribe) throw new Error(`_consumer is only valid for _action=unsubscribe messages`);
            if (this._workInTeam === false) {
              currentId = id;
            }
            //!!! todo: convert to typescript
            if (!unsubscribe && _type === targetType) {
              result.push({ id, data: _data, ...appAttrs });
              lastId = id;
            } else if (unsubscribe) {
              if (_team === tunnel.team && _consumer === tunnel.consumer) {
                await this._nonBlockRedisClient.xdel(
                  [tunnel.key],
                  id
                );
                if (!unsubscribing) {
                  await this._deleteRedisConsumerAndGroup(
                    tunnel
                  );
                  unsubscribing = true;
                }
              } else {
                if (this._workInTeam) {
                  await this.unsubscribe({
                    team: _team,
                    consumer: _consumer,
                    key: tunnel.key
                  });
                }
              }
            }
          }
        }
        if (unsubscribing) {
          return result;
        }
        yield result;
      }
    } catch (error) {
      if (this.closing) {
        return;
      }
      this.logger.debug("Consume error: %o", error);
      throw new RedisChannelsError(
        "Can not consume from the tunnel: " + tunnel[tun.KEY] + " " + tunnel[tun.CONSUMER],
        error
      );
    }
  }
  // TOODO
  /*
   * Acknowledges a message specified with an id.
   */
  /*
    // --------------------------------------------------------------------------|
    async acknowledge (tunnel, id) {
      try {
  
        await this._nonBlockRedisClient
          .xack([tunnel[tun.KEY], tunnel[tun.TEAM], id])
      } catch { }
    }
    */
  /*
   * Closes all redis clients and deletes all consumers and consumer groups
   */
  // --------------------------------------------------------------------------|
  async cleanup() {
    this.closing = true;
    this.logger.debug(" -- cleaning up", {
      workInTeam: this._workInTeam,
      consumers: Object.keys(this._consumers).length
    });
    for (const i in this._consumers) {
      if (this._workInTeam) {
        await this._deleteRedisConsumerAndGroup(this._consumers[i], true);
      }
      await this._consumers[i][tun.CONNECTION].disconnect();
      this._consumers[i][tun.CONNECTION].removeAllListeners();
      delete this._consumers[i];
    }
    if (this._nonBlockRedisClient) {
      await this._nonBlockRedisClient.disconnect(true);
      this._nonBlockRedisClient.removeAllListeners();
    }
  }
  /*
   * Deletes a redis consumer and a group
   */
  // --------------------------------------------------------------------------|
  async _deleteRedisConsumerAndGroup(tunnel, force = false) {
    try {
      if (this._workInTeam === false || force) {
        this.logger.debug(" -- deleting consumer and group", {
          key: tunnel[tun.KEY],
          team: tunnel[tun.TEAM],
          consumer: tunnel[tun.CONSUMER],
          force
        });
        await this._nonBlockRedisClient.xgroup([
          "DELCONSUMER",
          tunnel[tun.KEY],
          tunnel[tun.TEAM],
          tunnel[tun.CONSUMER]
        ]);
        const teams = await this._nonBlockRedisClient.xinfo([
          "GROUPS",
          tunnel[tun.KEY]
        ]);
        for (const i in teams) {
          const k = teams[i].indexOf("name");
          if (k < 0 || teams[i][k + 1] !== tunnel[tun.TEAM]) {
            continue;
          }
          const j = teams[i].indexOf("consumers");
          if (j >= 0 && teams[i][j + 1] === 0) {
            await this._nonBlockRedisClient.xgroup([
              "DESTROY",
              tunnel[tun.KEY],
              tunnel[tun.TEAM]
            ]);
          }
          break;
        }
      }
    } catch {
    }
  }
  /*
   *
   * Initialize all sorted sets which are used to distribute equable stream
   * keys over the shards.
   *
   * On error throws an exeption
   */
  // --------------------------------------------------------------------------|
  async _initShardScores() {
    try {
      this.logger.warn(" -- initializing shard scores shouldn't be needed for Dred use-cases", {
        keyZset: this._keyZset,
        slots: this._slots
      });
      for (let i = 0; i < this._slots; i++) {
        await this._nonBlockRedisClient.zincrby([this._keyZset, 0, i]);
      }
    } catch (error) {
      this.logger.error("_initShardScores error: %o", error);
      throw new RedisChannelsError(
        "Can not initialize shards score for the channels",
        error
      );
    }
  }
  // --------------------------------------------------------------------------|
  _createRedisClient(opts) {
    const { nodes, url, ...options } = opts || {};
    let redis;
    if (nodes && Array.isArray(nodes)) {
      redis = new Redis.Cluster(nodes, options);
    } else {
      if (url) {
        redis = new Redis(url, options);
      } else {
        redis = new Redis(options);
      }
    }
    redis.addListener("error", () => {
    });
    return redis;
  }
  // --------------------------------------------------------------------------|
  _duplicateRedisClient() {
    this.logger.debug("   -- duplicating redis client");
    const redis = this._nonBlockRedisClient.duplicate();
    redis.addListener("error", () => {
    });
    return redis;
  }
}

let p = process || {}, argv = p.argv || [], env = p.env || {};
let isColorSupported = !(!!env.NO_COLOR || argv.includes("--no-color")) && (!!env.FORCE_COLOR || argv.includes("--color") || p.platform === "win32" || true);
let formatter = (open, close, replace = open) => {
  const f = (input) => {
    let string = "" + input, index = string.indexOf(close, open.length);
    return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
  };
  f.start = open;
  f.close = close;
  return f;
};
let replaceClose = (string, close, replace, index) => {
  let result = "", cursor = 0;
  do {
    result += string.substring(cursor, index) + replace;
    cursor = index + close.length;
    index = string.indexOf(close, cursor);
  } while (~index);
  return result + string.substring(cursor);
};
let createColors = (enabled = isColorSupported) => {
  let f = enabled ? formatter : () => String;
  return {
    isColorSupported: enabled,
    reset: f("\x1B[0m", "\x1B[0m"),
    bold: f("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
    dim: f("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
    italic: f("\x1B[3m", "\x1B[23m"),
    underline: f("\x1B[4m", "\x1B[24m"),
    inverse: f("\x1B[7m", "\x1B[27m"),
    hidden: f("\x1B[8m", "\x1B[28m"),
    strikethrough: f("\x1B[9m", "\x1B[29m"),
    black: f("\x1B[30m", "\x1B[39m"),
    red: f("\x1B[31m", "\x1B[39m"),
    green: f("\x1B[32m", "\x1B[39m"),
    yellow: f("\x1B[33m", "\x1B[39m"),
    blue: f("\x1B[34m", "\x1B[39m"),
    magenta: f("\x1B[35m", "\x1B[39m"),
    cyan: f("\x1B[36m", "\x1B[39m"),
    white: f("\x1B[37m", "\x1B[39m"),
    gray: f("\x1B[90m", "\x1B[39m"),
    bgBlack: f("\x1B[40m", "\x1B[49m"),
    bgRed: f("\x1B[41m", "\x1B[49m"),
    bgGreen: f("\x1B[42m", "\x1B[49m"),
    bgYellow: f("\x1B[43m", "\x1B[49m"),
    bgBlue: f("\x1B[44m", "\x1B[49m"),
    bgMagenta: f("\x1B[45m", "\x1B[49m"),
    bgCyan: f("\x1B[46m", "\x1B[49m"),
    bgWhite: f("\x1B[47m", "\x1B[49m"),
    blackBright: f("\x1B[90m", "\x1B[39m"),
    redBright: f("\x1B[91m", "\x1B[39m"),
    greenBright: f("\x1B[92m", "\x1B[39m"),
    yellowBright: f("\x1B[93m", "\x1B[39m"),
    blueBright: f("\x1B[94m", "\x1B[39m"),
    magentaBright: f("\x1B[95m", "\x1B[39m"),
    cyanBright: f("\x1B[96m", "\x1B[39m"),
    whiteBright: f("\x1B[97m", "\x1B[39m"),
    bgBlackBright: f("\x1B[100m", "\x1B[49m"),
    bgRedBright: f("\x1B[101m", "\x1B[49m"),
    bgGreenBright: f("\x1B[102m", "\x1B[49m"),
    bgYellowBright: f("\x1B[103m", "\x1B[49m"),
    bgBlueBright: f("\x1B[104m", "\x1B[49m"),
    bgMagentaBright: f("\x1B[105m", "\x1B[49m"),
    bgCyanBright: f("\x1B[106m", "\x1B[49m"),
    bgWhiteBright: f("\x1B[107m", "\x1B[49m")
  };
};
const colors = createColors();

const devMessage = Symbol("?developer?");
//! it provides a type facade to describe available events

var __defProp$d = Object.defineProperty;
var __defNormalProp$d = (obj, key, value) => key in obj ? __defProp$d(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$d = (obj, key, value) => __defNormalProp$d(obj, typeof key !== "symbol" ? key + "" : key, value);
class Discovery {
  constructor(options) {
    __publicField$d(this, "nbh");
    // neighborhood
    __publicField$d(this, "hosts");
    __publicField$d(this, "events", new EventEmitter());
    __publicField$d(this, "logger", contextLogger("discovery"));
    const { neighborhood } = options;
    this.nbh = "";
    if (neighborhood) this.setNeighborhood(neighborhood);
    //! it prevents subclasses from overriding restartHostDiscovery() logic; see initHostDiscovery() instead.
    if (this.restartHostDiscovery !== Discovery.prototype.restartHostDiscovery) {
      throw new Error(`restartHostDiscovery must not be overridden by Discovery subclass ` + this.constructor.name);
    }
  }
  //! finds available neighborhoods through its discovery mechanism, if any.  
  //    throws an error if it doesn't implement nbh discovery.
  async getNeighborhoods() {
    throw new Error(`this discovery protocol doesn't implement getNeighborhoods().  instantiate it with a predefined neighborhood name instead.`);
  }
  hasNeighborhood() {
    return !!this.nbh;
  }
  //! it allows concrete subclasses to implement custom behavior during initHostDiscovery()
  async initHostDiscovery() {
  }
  async restartHostDiscovery() {
    if (!this.nbh) throw new Error(`can't start host discovery without nbh`);
    //!!! todo: it emits a host-discovery-timeout event if hosts can't be discovered promptly.
    this.logger.info(`restarting host discovery for neighborhood ${this.nbh}`);
    await this.initHostDiscovery();
    this.events.emit("hosts:discovering", {
      message: "discovering neighborhood hosts...",
      nbh: this.nbh,
      [devMessage]: "suggested: update user with this status message"
    });
    const hosts = await this.getHostList();
    const e = {
      hosts,
      message: `found ${hosts.length} hosts serving neighborhood`,
      nbh: this.nbh,
      [devMessage]: "suggested: update user with this status message"
    };
    if (!this.hosts) {
      this.events.emit("hosts:ready", e);
    }
    this.hosts = hosts;
    this.events.emit("hosts:updated", e);
  }
  setNeighborhood(nbh) {
    this.nbh = nbh;
    this.logger.info(`setting neighborhood ${nbh} - no ` + new Error("called by...").stack);
    this.restartHostDiscovery();
    return this;
  }
  reset(newHosts = []) {
    this.hosts = newHosts;
    return this;
  }
  async myServerInfo(serverId) {
    const hosts = await this.getHostList();
    return hosts.find((x) => serverId == x.serverId);
  }
}

var __defProp$c = Object.defineProperty;
var __defNormalProp$c = (obj, key, value) => key in obj ? __defProp$c(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$c = (obj, key, value) => __defNormalProp$c(obj, typeof key !== "symbol" ? key + "" : key, value);
const nbhChannelListChannel = "_chans";
const nbhAuthInfoChannel = "_auth";
function expandChannelListeners(listeners) {
  return listeners.type === "mass" ? [...listeners.channels, nbhChannelListChannel, nbhAuthInfoChannel] : listeners.subs ? Object.keys(listeners.subs) : [];
}
const defaultMaxDelayMs = 0;
const _ChannelSubscriptionListener = class _ChannelSubscriptionListener {
  // XXevents: EventEmitter<ChannelSubEvents>;
  constructor(config) {
    __publicField$c(this, "config");
    __publicField$c(this, "options");
    __publicField$c(this, "logger");
    __publicField$c(this, "olderMsgs");
    __publicField$c(this, "recentMsgs");
    __publicField$c(this, "lastRotated");
    __publicField$c(this, "listener");
    const { listener, logger, ...rest } = config;
    this.config = rest;
    this.options = rest.options;
    this.logger = logger;
    //! it tracks recent messages to prevent duplicate notifications
    this.recentMsgs = /* @__PURE__ */ new Set();
    //! it prevents unbounded growth of the tracking data structure
    this.olderMsgs = /* @__PURE__ */ new Set();
    this.lastRotated = Date.now();
    this.listener = listener;
  }
  hasSeen(originalClientId, msgId) {
    const now = Date.now();
    if (now - this.lastRotated > _ChannelSubscriptionListener.rotationIntervalMs) {
      this.olderMsgs = this.recentMsgs;
      this.recentMsgs = /* @__PURE__ */ new Set();
      this.lastRotated = now;
    }
    if (originalClientId) {
      if (this.recentMsgs.has(originalClientId)) return true;
      if (this.olderMsgs.has(originalClientId)) return true;
    }
    if (msgId) {
      if (this.recentMsgs.has(msgId)) return true;
      if (this.olderMsgs.has(msgId)) return true;
    }
    return false;
  }
  notify(event) {
    const {
      mid: msgId,
      ocid: originalClientId,
      connection,
      message,
      details,
      neighborhood,
      channel
    } = event;
    if (this.hasSeen(originalClientId)) {
      this.logger.trace("already seen: %s", originalClientId);
      return;
    }
    if (this.hasSeen(msgId)) {
      this.logger.error("already seen messageId: %s", msgId);
      return;
    }
    const seen = this.recentMsgs;
    if (!seen.has(originalClientId) && !seen.has(msgId)) {
      seen.add(msgId);
      this.logger.trace("msg %s", originalClientId);
      this.listener(event);
    }
  }
};
// allows a message to be deduplicated within 60 seconds
__publicField$c(_ChannelSubscriptionListener, "rotationIntervalMs", 30 * 1e3);
let ChannelSubscriptionListener = _ChannelSubscriptionListener;

//! converts a nodejs Readable Stream as returned by `node-fetch` and `cross-fetch`
function nodeToWebStream(nodeStream) {
  let destroyed = false;
  let listeners = {};
  function start(controller) {
    listeners["data"] = onData;
    listeners["end"] = onData;
    listeners["end"] = onDestroy;
    listeners["close"] = onDestroy;
    listeners["error"] = onDestroy;
    for (const name in listeners) nodeStream.on(name, listeners[name]);
    nodeStream.pause();
    function onData(chunk) {
      if (destroyed) return;
      controller.enqueue(chunk);
      nodeStream.pause();
    }
    function onDestroy(err) {
      if (destroyed) return;
      destroyed = true;
      for (const name in listeners)
        nodeStream.removeListener(name, listeners[name]);
      if (err) controller.error(err);
      else controller.close();
    }
  }
  function pull() {
    if (destroyed) return;
    nodeStream.resume();
  }
  function cancel() {
    destroyed = true;
    for (const name in listeners)
      nodeStream.removeListener(name, listeners[name]);
    nodeStream.push(null);
    nodeStream.pause();
    if (nodeStream.destroy) nodeStream.destroy();
    else if (nodeStream.close) nodeStream.close();
  }
  return new ReadableStream$1({ start, pull, cancel });
}

//! purpose: allows server-side code to handle fetch() responses with a streaming
const ReadableStream = ReadableStream$1;
function fromPlatformFetchBody(b) {
  if (b instanceof Readable) return nodeToWebStream(b);
  return b;
}

function ndjsonStream(responseBody) {
  let is_reader, cancellationRequest = false;
  return new ReadableStream({
    start: function(controller) {
      var reader = responseBody.getReader();
      is_reader = reader;
      var decoder = new TextDecoder();
      var data_buf = "";
      return reader.read().then(function processResult(result) {
        if (result.done) {
          if (cancellationRequest) {
            return;
          }
          data_buf = data_buf.trim();
          if (data_buf.length !== 0) {
            try {
              var data_l = JSON.parse(data_buf);
              controller.enqueue(data_l);
            } catch (e) {
              console.error("error while parsing: ", {
                data_buf,
                e
              });
              controller.error(e);
              return;
            }
          }
          controller.close();
          return;
        }
        var data = decoder.decode(result.value, { stream: true });
        data_buf += data;
        var lines = data_buf.split("\n");
        for (var i = 0; i < lines.length - 1; ++i) {
          var l = lines[i].trim();
          if (l.length > 0) {
            try {
              var data_line = JSON.parse(l);
              controller.enqueue(data_line);
            } catch (e) {
              controller.error(e);
              cancellationRequest = true;
              reader.cancel();
              return;
            }
          }
        }
        data_buf = lines[lines.length - 1];
        return reader.read().then(processResult);
      });
    },
    cancel: function(reason) {
      console.debug("Cancel registered due to ", reason);
      cancellationRequest = true;
      is_reader.cancel();
    }
  });
}

var __defProp$b = Object.defineProperty;
var __defNormalProp$b = (obj, key, value) => key in obj ? __defProp$b(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$b = (obj, key, value) => __defNormalProp$b(obj, typeof key !== "symbol" ? key + "" : key, value);
let instanceId = 0;
class StateMachine {
  constructor() {
    __publicField$b(this, "$state");
    __publicField$b(this, "$notifier");
    __publicField$b(this, "destroyed", false);
    __publicField$b(this, "_deferredSMAction");
    __publicField$b(this, "instanceId");
    __publicField$b(this, "onEntry", {});
    this.instanceId = instanceId++;
    this.$state = this.initialState;
    this.$notifier = new EventEmitter();
    Object.defineProperty(this, "$notifier", {
      enumerable: false
    });
    this.resetState();
    this.onStateEntered = this.onStateEntered.bind(this);
    this.$notifier.on(
      "state:entered",
      // avoid type-resolution loop with any cast
      this.onStateEntered
    );
  }
  get $deferredAction() {
    const deferredAction = this._deferredSMAction;
    if (!deferredAction) return "";
    const { type, displayStatus } = deferredAction;
    return displayStatus;
  }
  get $describeDeferredAction() {
    const deferredAction = this._deferredSMAction;
    if (!deferredAction) return "";
    const { type, displayStatus } = deferredAction;
    const nextThing = deferredAction?.targetState || deferredAction?.transitionName;
    return `(deferred ${type} '${nextThing}'): ${displayStatus}`;
  }
  get deferredTargetState() {
    const deferredAction = this._deferredSMAction;
    if (!deferredAction) return "";
    if (deferredAction.targetState) return deferredAction.targetState;
    const currentState = this.$state;
    if (!currentState) return "";
    const currentTransition = deferredAction.transitionName;
    const transitionsAvailable = this.transitionTable[currentState];
    if (!transitionsAvailable) {
      throw new Error(`\u{1F353}\u{1F378} ${this.stateMachineName}: deferred transition (${currentTransition}) invalid from ${currentState} (no transitions defined)`);
    }
    const transition = transitionsAvailable[currentTransition];
    if (!transition) {
      throw new Error(`\u{1F353}\u{1F378} ${this.stateMachineName}: deferred transition (${currentTransition}) invalid from state: ${currentState}`);
    }
    return transition.to;
  }
  /**
   * schedules a deferred transition to be performed when the promise resolves
   * @remarks
   * When there is a deferred transition, the state-machine will not accept other
   * transitions until the promise resolves one way or the other.
   *
   * A prime use-case for a deferred transition is for an onEntry hook to
   * defer (with setTimeout()) an unconditional next activity that will be
   * triggered by transitioning to the next state.
   * 
   * The displayStatus is used to provide transparency about the
   * implied "activity" of waiting to trigger the transition.  For instance,
   * a "doneCooking" state on a microwave might have a displayStatus of
   * "food is ready", with a 2m-deferred transition to "remindingReady" state,
   * where it beeps three times and returns to doneCooking for further
   * reminders (opening the door or pressing Cancel would interrupt and
   * prevent the deferred transition).
   * 
   * ### Return-type notes
   * Note that the returned type is not usable as result of an
   * onTransition hook or onEntry hook.  In onTransition, you can return
   * `this.$deferredState(...)`.  To use `$deferredTransition(...)` in onEntry,
   * just call it and don't return it.
   */
  $deferredTransition(tn, displayStatus, promiseOrDelay) {
    if (this._deferredSMAction) {
      this.warn("existing action: ", this._deferredSMAction);
      throw new Error(
        `\u{1F353}\u{1F378} ${this.stateMachineName} already has a deferred action pending`
      );
    }
    let promise = promiseOrDelay;
    let delay = "";
    if ("number" == typeof promiseOrDelay) {
      delay = `@ +${promiseOrDelay}ms`;
      promise = this.delayed(promiseOrDelay);
    }
    const pAction = {
      type: "transition",
      transitionName: tn,
      displayStatus,
      promise
    };
    this._deferredSMAction = pAction;
    const p = promise.promise ?? promise;
    this.progress(`
  -- scheduled! ${delay} \u23F0`);
    this.ignoringListenerErrors("changed", () => {
      this.$notifier.emit("changed", this);
    });
    p.then(
      () => {
        if (!this._deferredSMAction) {
          this.trace(
            `    -- deferred transition ${tn} already triggered \u{1F44D}`
          );
          return;
        }
        if (this.destroyed) {
          this.debug(" -- was destroyed; abandoning deferred transition");
        }
        this._deferredSMAction = void 0;
        this.progress("    -- triggering deferred state transition");
        this.transition(tn);
      },
      () => {
        this._deferredSMAction = void 0;
      }
    );
    return pAction;
  }
  ignoringListenerErrors(event, cb) {
    try {
      cb();
    } catch (e) {
      this.warn(`Note: error in '${event}' listener`, e);
    }
  }
  /**
   * Schedules the completion of a deferred transition, placing the
   * state-machine into the target state.
   * @remarks
   * When the context of a particular state-transition has a natural
   * affinity to a delayed effect of triggering a state-change (or to
   * re-initiating the current-state), this method can be used to
   * indicate that deferred effect.
   * 
   * The displayStatus is used to provide transparency about the cause
   * and context of the delayed change-of-state.
   *
   * The deferred transition will be cancelled if the promise is
   * cancelled or fails.
   *
   * A key use-case for this is to allow a transition that can re-trigger
   * the onEntry effects of the current state (or another next state), while
   * remaining cosmetically or semantically in the original state, deferred
   * the deferred entry to the target state; the target state's onEntry
   * hook will then be called after the transition is actually finished.
   * 
   * Meanwhile, there is an explicit block on other state-transitions, and
   * there is an explicit current displayStatus providing strong transparency
   * about the deferred switch to the target state.
   *
   * As an example, a kitchen-timer feature on a microwave might (once it
   * finishes its countdown to zero and is done beeping), trigger a 
   * `$deferredState("idle", ...)` with a deferred displayStatus of "timer finished".  
   * It would then move to idle when the Cancel button is pressed.  This example 
   * differs from that in $deferredTransition(), with the assumption that the
   * kitchen timer doesn't try to bug the user about it being finished,
   * the way the "doneCooking" state example describes. 
   * 
   * ### Return-type notes
   * Note that this type is only valid as the return value of an onTransition
   * callback, and not as a return value of an onEntry hook.  In an onEntry
   * hook, call and don't return the $deferredTransition(...).
   */
  $deferredState(transitionName, targetState, displayStatus, promiseOrDelay) {
    if (this._deferredSMAction) {
      this.warn("existing action: ", this._deferredSMAction);
      throw new Error(
        `\u{1F353}\u{1F378} ${this.stateMachineName} already has a deferred action`
      );
    }
    let promise = promiseOrDelay;
    if ("number" == typeof promiseOrDelay) {
      promise = this.delayed(promiseOrDelay);
    }
    const pAction = {
      type: "state",
      promise,
      displayStatus,
      transitionName,
      targetState
    };
    this._deferredSMAction = pAction;
    const p = promise.promise ?? promise;
    p.catch(
      () => {
        this.warn(
          `promise for deferred action cancelled or failed
  ... NOT committing state -> ${targetState}`
        );
        this._deferredSMAction = void 0;
      }
    );
    return pAction;
  }
  async delayed(delay) {
    return new Promise((res) => {
      setTimeout(res, delay);
    });
  }
  onStateEntered(sm, state) {
    const entryHook = this.onEntry[state];
    if (entryHook) {
      entryHook.call(this);
    }
  }
  destroy() {
    this.$notifier.emit("destroyed", this);
    this.$notifier.removeAllListeners();
    this.$notifier = "destroyed";
    this.destroyed = true;
  }
  notDestroyed() {
    if (this.destroyed) {
      throw new Error(
        `\u{1F353}\u{1F378} ${this.stateMachineName} has already  been destroyed`
      );
    }
  }
  logPrefix() {
    const deferredAction = this._deferredSMAction;
    let deferredStatus = deferredAction?.displayStatus;
    let deferredType = deferredAction?.type;
    let nextThing = deferredAction?.targetState || deferredAction?.transitionName;
    deferredStatus = deferredStatus ? `(deferred ${deferredType} ${nextThing}: ${deferredStatus})` : "";
    return `@${this.$state} ${deferredStatus}: `;
  }
  error(message, ...args) {
    if (this.logger) return this.logger.error(message, ...args);
    console.error(`${this.logLabel} ${this.logPrefix()} ${message}`, ...args);
  }
  warn(message, ...args) {
    if (this.logger) return this.logger.warn(message, ...args);
    console.warn(`${this.logLabel} ${this.logPrefix()} ${message}`, ...args);
  }
  info(message, ...args) {
    if (this.logger) return this.logger.info(message, ...args);
    console.info(`${this.logLabel} ${this.logPrefix()} ${message}`, ...args);
  }
  progress(message, ...args) {
    if (this.logger) return this.logger.progress(message, ...args);
    console.info(`${this.logLabel} ${this.logPrefix()} ${message}`, ...args);
  }
  debug(message, ...args) {
    if (this.logger) return this.logger.debug(message, ...args);
    console.debug(`${this.logLabel} ${this.logPrefix()} ${message}`, ...args);
  }
  trace(message, ...args) {
    if (this.logger) return this.logger.trace(message, ...args);
    console.trace(`${this.logLabel} ${this.logPrefix()} ${message}`, ...args);
  }
  get logLabel() {
    return `\u{1F353}\u{1F378} ${this.instanceId} ${this.stateMachineName}`;
  }
  get stateMachineName() {
    return this.constructor.name;
  }
  get initialState() {
    throw new Error("abstract");
  }
  /**
   * creates a transition function for the indicated transition name
   * @remarks
   * the prefix brings this most common method to the top for autocomplete
   *
   * the resulting callback will try to transition the state-machine
   * but can fail if the transition table doesn't permit the named transition
   * at the time of the call.
   * @public
   */
  $mkTransition(tn) {
    return this.mkTransition(tn);
  }
  /**
   * creates a transition function for the indicated transition name
   * @remarks
   * The resulting callback will try to transition the state-machine
   * but can fail if the transition table doesn't permit the named transition
   * at the time of the call.
   * @public
   */
  mkTransition(tn) {
    return this.transition.bind(this, tn);
  }
  /**
   * returns true if the state-machine can currently use the named transition
   * @public
   */
  $canTransition(tn) {
    if (this._deferredSMAction) return false;
    return !!this.transitionTable[this.$state][tn];
  }
  /**
   * transitions the state-machine through the indicated tx name
   * @remarks
   * can fail if the transition table doesn't permit the named transition
   * while in the current state.
   *
   * the prefix brings this most common method to the top for autocomplete
   * @public
   */
  $transition(tn) {
    return this.transition(tn);
  }
  /**
   * transitions the state-machine through the indicated tx name
   * @public
   */
  transition(tn) {
    const currentState = this.$state;
    const foundTransition = this.transitionTable[currentState][tn];
    if (!foundTransition) {
      debugger;
      throw new Error(
        ` \u{1F353}\u{1F378} ${this.stateMachineName}: invalid transition '${tn}' from state=${currentState}`
      );
    }
    const { to: targetState, onTransition } = foundTransition;
    if (this._deferredSMAction) {
      if (targetState == this.deferredTargetState) {
        this._deferredSMAction = void 0;
      } else {
        this.warn(" -- can't transition with deferred action : ( ");
        throw new Error(
          `${this.stateMachineName} can't do transition ${tn} with deferred action '${this.$describeDeferredAction}' pending`
        );
      }
    }
    let error = "";
    let nextState;
    try {
      nextState = onTransition?.() || targetState;
    } catch (e) {
      nextState = false;
      error = e.message || e;
    }
    return this.finishTransition(tn, targetState, currentState, nextState, error);
  }
  finishTransition(tn, targetState, currentState, nextState, error) {
    if (this.destroyed) return void 0;
    let wasCancelled = false;
    if (!error) this.ignoringListenerErrors("transition", () => {
      function mayCancelTransition(reason) {
        wasCancelled = true;
        error = reason || "\u2039unknown reason\u203A";
        nextState = false;
      }
      this.$notifier.emit("transition", this, {
        from: currentState,
        transition: tn,
        to: targetState,
        cancelTransition: mayCancelTransition
      });
    });
    if (nextState == false) {
      this.info(
        `transition canceled: ${currentState}: ${tn} XXX ${targetState}` + (wasCancelled ? `
 -- cancelled by 'transition' listener` : "") + (!!error ? ` -- ${error}` : "") + `
  -- staying in state ${currentState}`
      );
      return;
    }
    if (nextState && "string" != typeof nextState) {
      const ns = nextState;
      const {
        displayStatus,
        promise,
        targetState: targetState2,
        type
      } = ns;
      this._deferredSMAction = ns;
      const p = promise.promise ?? promise;
      p.then(
        () => {
          if (this._deferredSMAction) {
            this._deferredSMAction = void 0;
            this.progress(
              `    --  commit deferred ${type} -> ${targetState2}`
            );
            return this.finishTransition(
              tn,
              targetState2,
              currentState,
              targetState2,
              ""
            );
          }
        }
      );
    } else if (this.$state != currentState) {
      const trampolineState = this.$state;
      this.progress(
        `  -- trampolined ^^ ${currentState}: ${tn} \u{1F3D2} -> ~~${nextState}~~  \u{1F945} ${trampolineState} during ${tn} `
      );
    } else {
      nextState = nextState || targetState;
      const stateRedirect = nextState == targetState ? "" : `~~${targetState}~~  -> `;
      this.progress(` -- ${tn} \u{1F3D2} -> ${stateRedirect} \u{1F945} ${nextState}`);
      this.$state = nextState || targetState;
      this.ignoringListenerErrors("changed", () => {
        this.$notifier.emit("changed", this);
      });
      return new Promise((resolve) => {
        resolve();
        this.ignoringListenerErrors("state:entered", () => {
          this.$notifier.emit("state:entered", this, this.$state);
        });
      });
    }
  }
}

var __defProp$a = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __defNormalProp$a = (obj, key, value) => key in obj ? __defProp$a(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$2(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result) __defProp$a(target, key, result);
  return result;
};
var __publicField$a = (obj, key, value) => __defNormalProp$a(obj, typeof key !== "symbol" ? key + "" : key, value);
const noTransitionsExcept = {
  connect: null,
  abort: null,
  retry: null,
  failed: null,
  reconnect: null,
  connected: null,
  disconnected: null
};
const connectionEvents = {
  warning: "we timed out or encountered a problem connecting, but we'll keep retrying for a while",
  failed: "we stopped trying to make this connection work.  Another HostConnection to this host might be created by the connection manager, but this connection never got started and is dead, dead, dead.",
  connected: "successful connection; monitoring for new events in subscribed channels.",
  message: "message received from a subscribed channel",
  replacedBy: "a new connection (see the 'replacedBy' key) replaced this one.",
  disconnected: "disconnected due to network error or missed heartbeats.",
  aborted: "connection aborted normally by controlling signal"
};
const _HostConnection = class _HostConnection extends StateMachine {
  constructor(options) {
    const { host, subscriptions, settings, clientid } = options;
    super();
    __publicField$a(this, "events", new EventEmitter());
    __publicField$a(this, "abortController");
    __publicField$a(this, "host");
    __publicField$a(this, "settings");
    __publicField$a(this, "attempts", 0);
    __publicField$a(this, "lastError");
    __publicField$a(this, "channelSubs");
    __publicField$a(this, "stream");
    __publicField$a(this, "clientid");
    __publicField$a(this, "startTime", (/* @__PURE__ */ new Date()).getTime());
    __publicField$a(this, "scheduledRetry");
    __publicField$a(this, "logger");
    __publicField$a(this, "_status");
    // assigned by state-machine
    __publicField$a(this, "_destroyed", false);
    // Flag to track if connection is being destroyed
    __publicField$a(this, "_disconnecting", false);
    __publicField$a(this, "connecting");
    __publicField$a(this, "heartbeatInterval", 1e4);
    __publicField$a(this, "lastHeartbeat", (/* @__PURE__ */ new Date()).getTime());
    __publicField$a(this, "heartbeatTimer");
    __publicField$a(this, "onEntry", {
      [`connecting`]: () => {
        return this.connect().then(
          () => {
            this.progress("connect() succeeded");
            return this.transition("connected");
          },
          (e) => {
            debugger;
            this.lastError = e;
            this.warn("connect() failed, retrying", e.stack);
            return this.transition("retry");
          }
        );
      },
      [`retrying`]: () => {
        this.attempts += 1;
        if (this.attempts > this.settings.maxRetries) {
          return this.transition("failed");
        }
        const retryInterval = this.nextRetryInterval();
        const { maxRetries } = this.settings;
        this.ignoringListenerErrors(
          "retrying",
          () => this.events.emit(
            "retrying",
            this.mkEvent({
              message: `connection error; will retry in ${Math.floor(
                retryInterval / 1e3
              )} seconds`,
              [devMessage]: [
                "This host connection got an error or timeout trying to connect, but it will retry on its own.",
                "Each retry will be delayed a bit longer than the previous one. "
              ],
              retryCount: this.attempts,
              maxRetries
            })
          )
        );
        this.$deferredTransition("reconnect", "will retry", retryInterval);
      },
      [`connected`]: () => {
        this.progress("message stream established");
        this.ignoringListenerErrors("connected", () => {
          this.events.emit("connected", {
            connection: this,
            message: "successful connection to neighborhood host",
            attempts: this.attempts,
            delayTime: this.elapsedTime(),
            [devMessage]: [
              "The connection is established and will emit 'message' events when received from the host."
            ]
          });
        });
      },
      [`failed`]: () => {
        this.ignoringListenerErrors(
          "failed",
          () => this.events.emit(
            "failed",
            this.mkEvent({
              message: `giving up after persistent connection failure (${this.settings.maxRetries} attempts). `,
              recommendatIon: "check network connection, use patience, retry.  Do you have another way to connect to the network?",
              [devMessage]: [
                `The HostConnection object tried hard to get connected`,
                `The connection manager is expected to retry, so it may be`,
                `... better not to make maxRetries larger or to Infinity to keep retrying.`,
                `See also: the 'retrying' event offered by the host connection.`
              ]
            })
          )
        );
      },
      [`disconnected`]: () => {
        this.stopRetries();
      }
    });
    __publicField$a(this, "transitionTable", {
      [`default`]: {
        ...noTransitionsExcept,
        connect: {
          to: "connecting"
        }
      },
      [`connecting`]: {
        ...noTransitionsExcept,
        connected: {
          to: "connected"
        },
        abort: {
          to: "aborted"
        },
        failed: {
          to: "failed"
        },
        retry: {
          to: "retrying"
        },
        disconnected: {
          to: "disconnected"
        }
      },
      [`retrying`]: {
        ...noTransitionsExcept,
        failed: {
          to: "failed"
        },
        reconnect: {
          to: "connecting",
          onTransition: () => {
            this.connecting = void 0;
            this.connect();
          }
        },
        abort: {
          to: "aborted"
        }
      },
      [`connected`]: {
        ...noTransitionsExcept,
        failed: {
          to: "failed"
        },
        abort: {
          to: "aborted"
        },
        disconnected: {
          to: "disconnected",
          onTransition: () => {
            if (this.abortController && this.abortController.signal.aborted) {
              return;
            }
            this.events.emit("disconnected", {
              message: "server disconnected",
              connection: this,
              reason: "... from new location TBD",
              [devMessage]: ["no action needed; ConnectionManager will retry"]
            });
          }
        }
      },
      [`failed`]: {
        ...noTransitionsExcept
      },
      [`disconnected`]: {
        ...noTransitionsExcept,
        abort: { to: "disconnected" }
      },
      [`aborted`]: {
        ...noTransitionsExcept,
        disconnected: {
          to: "aborted"
        }
      }
    });
    this.logger = zonedLogger("hostconn", {
      clientid,
      loggerId: nanoid(4),
      transitionName: void 0,
      addContext: null,
      extra: subscriptions.map((x) => x.channel)
    });
    this.settings = _HostConnection.settingsWithDefaults(settings);
    this.events.on("replacedBy", ({}) => {
    });
    this.host = host;
    this.channelSubs = subscriptions;
    this.clientid = clientid;
    this.transition("connect");
  }
  // Flag to track if disconnection is in progress
  set currentState(v) {
    this._status = v;
  }
  get currentState() {
    return this._status;
  }
  resetState() {
  }
  log(message, ...args) {
    this.logger.info(this.logPrefix() + message, ...args);
  }
  error(message, ...args) {
    this.logger.error(message, ...args);
  }
  warn(message, ...args) {
    this.logger.warn(message, ...args);
  }
  info(message, ...args) {
    this.logger.info(message, ...args);
  }
  progress(message, ...args) {
    this.logger.progress(message, ...args);
  }
  debug(message, ...args) {
    this.logger.debug(message, ...args);
  }
  trace(message, ...args) {
    this.logger.trace(message, ...args);
  }
  elapsedTime() {
    const now = /* @__PURE__ */ new Date();
    return now.getTime() - this.startTime;
  }
  nextRetryInterval() {
    return Math.min(
      this.settings.retryBaseIntervalMs * Math.pow(1.27, this.attempts),
      this.settings.retryMaxIntervalMs
    );
  }
  disconnect(reason) {
    if (this._disconnecting) {
      this.logger?.debug(
        `disconnect() called but already disconnecting for ${this.host?.serverId || "unknown"}`
      );
      return;
    }
    this._disconnecting = true;
    this.logger?.debug(
      `disconnect() starting for ${this.host?.serverId || "unknown"}: ${reason}`
    );
    //!!! todo: cancel any pending stream with ReadableStream.cancel()
    if (this.abortController) this.abortController.abort(`disconnect(): ${reason}`);
    this.stopRetries();
    this._destroyed = true;
  }
  stopRetries() {
    if (this.scheduledRetry) clearTimeout(this.scheduledRetry);
    this.scheduledRetry = void 0;
  }
  async replacedBy(otherConnection) {
    this.events.emit("replacedBy", {
      connection: this,
      replacement: otherConnection,
      message: "this connection was replaced, probably due to new subscription settings",
      [devMessage]: [
        "This is a normal operational condition when changing channel-subscription settings.",
        "Connection manager is expected to move this old connection to the graveyard",
        "... and get rid of any references, listeners, etc on the old connection ...",
        "... to ensure it is properly garbage collected."
      ]
    });
  }
  static settingsWithDefaults(partialSettings) {
    return {
      retryBaseIntervalMs: 1e3,
      retryMaxIntervalMs: 3e4,
      maxRetries: Infinity,
      connectionWaitTimeMs: 7e3,
      watchChannels: false,
      ...partialSettings
    };
  }
  get initialState() {
    return "default";
  }
  async connect() {
    if (this.connecting) {
      return this.connecting;
    }
    this.abortController = new AbortController();
    const { signal } = this.abortController;
    const abortHandler = () => {
      if (this._disconnecting || this._destroyed) {
        return;
      }
      try {
        this.transition("abort");
      } catch (error) {
        if (this._disconnecting || this._destroyed) {
          return;
        }
        this.logger.warn(`Unexpected abort transition error: ${error}`);
      }
    };
    const channelListeners = this.channelSubs;
    signal.addEventListener("abort", abortHandler);
    const myself = this.connecting = new Promise((res, rej) => {
      let aborted = false;
      this.logger.debug(`connecting to server ${this.host.serverId}`);
      this.logger.trace("channelListeners", channelListeners);
      this.fetch(`/channels/listen`, {
        body: JSON.stringify(this.channelSubs, null, 2),
        method: "POST",
        signal,
        headers: {
          "content-type": "application/json",
          clientid: this.clientid
        }
      }).then((response) => {
        if (aborted) return false;
        if (this.abortController?.signal.aborted) return false;
        if (!response) return false;
        this.logger.progress("connect: listening for %d channels", channelListeners.length);
        this.logger.debug("channelListeners: ", channelListeners.map((x) => x.channel));
        //!!! todo: check to see if we should reject with an empty / non-existent response here
        res(true);
      }).catch((e) => {
        if (this.isAbortError(e)) {
          aborted = true;
        } else if ((e?.message || e?.toString())?.match(/connection manager disconnect/)) {
          aborted = true;
        } else {
          debugger;
          this.warn(`fetch error; see debugger: %s`, e.stack || e.message || e);
          this.events.emit("failed", this.connectionFailureEvent(e));
        }
      });
    });
    return myself;
  }
  mkEvent(args) {
    const { [devMessage]: dm, message, ...moreArgs } = args;
    return {
      connection: this,
      message: `[${this.host.serverId} at ${this.host.address}]: ${message}`,
      reason: this.lastError,
      [devMessage]: dm,
      ...moreArgs
    };
  }
  connectionFailureEvent(e) {
    return {
      connection: this,
      reason: e,
      message: `[${this.host.serverId} at ${this.host.address}] connection failure`,
      recommendation: "check for network connectivity, retry if needed",
      [devMessage]: [
        "developers should check for correctness of the fetch call",
        "Connection manager is expected to monitor for failed connections ...",
        "... and ensure that a suitable replacement is created.  ",
        "Connection manager is expected to detect persistent connection problems ...",
        "... IF the OVERALL health of the neighborhood is affected,",
        "... and to escalate the message/recommendation info to users",
        "For more troubleshooting, check the 'reason' error object, and for deeper inspection,",
        "... there is also a debugging breakpoint available"
      ]
    };
  }
  //! it implements a streaming listener for changes
  async fetch(path, { debug = false, ...options }) {
    if (path[0] !== "/") path = `/${path}`;
    const { host } = this;
    const proto = host.insecure ? "http" : "https";
    const shortServer = `${host.address}:${host.port}`;
    const url = `${proto}://${shortServer}${path}`;
    options.mode = "cors";
    //!!! todo: it includes cryptographic credentials in the connection for the server
    const result = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        "content-type": "application/json",
        accept: "application/json",
        clientid: this.clientid
      }
    });
    if (debug) debugger;
    //! successful requests are directly resolved to the parsed json ...
    if (result.ok) {
      this.monitorSubscriptions(result);
      return result;
    }
    //! failed requests @request or parsing level cause a rejection.
    const reason = await result.json().catch((r) => {
      return new Error(`${result.status} ${result.statusText} for ${path}`);
    });
    this.events.emit("failed", this.connectionFailureEvent(reason));
    return Promise.reject(reason);
  }
  async monitorSubscriptions(response) {
    if (!response.ok) throw new Error(`failure in listen...`);
    const compatResponse = fromPlatformFetchBody(response.body);
    this.stream = ndjsonStream(compatResponse);
    const reader = this.stream.getReader();
    let event, connected = true;
    const detectReadError = (e) => {
      if (this.isAbortError(e)) {
        connected = false;
      } else if (typeof e === "string" && e.match(/connection manager disconnect/)) {
        this.debug("disconnected on command from connection manager");
        this.transition("disconnected");
      } else {
        console.warn(`fetch error during read; see debugger - `, e);
        debugger;
        this.events.emit(
          "warning",
          this.mkEvent({
            message: "fetch error during read",
            [devMessage]: [
              "probably this is caused by a network connection error",
              " ... or server-side idle timeout, though we'd hope to get a toodleoo first.",
              "Connection manager can sometimes safely ignore a couple of these,",
              " ... especially if the user has gone idle",
              " ... and/or if the app doesn't have special realtime or security requirements.  ",
              " ... it SHOULD re-establish a healthy connection set when activity resumes"
            ],
            reason: e
          })
        );
      }
      return void 0;
    };
    while (connected) {
      event = await reader.read().catch(detectReadError);
      if (!event) break;
      if (!connected) break;
      const ts = /* @__PURE__ */ new Date();
      const { value, done } = event;
      if (done) {
        this.events.emit(
          "disconnected",
          this.mkEvent({
            message: "server disconnected",
            [devMessage]: "The server disconnected cleanly, notifying us that it was done. "
          })
        );
        this.transition("disconnected");
        debugger;
        return;
      }
      if ("heartbeat" == value?.type) {
        this.heartbeatReceived();
        continue;
      }
      if ("heartbeat-info" == value?.type) {
        const { timerInterval } = value;
        this.trace("heartbeat-info: expecting heartbeats every %d ms", timerInterval);
        this.heartbeatInterval = timerInterval;
        continue;
      }
      if ("warning" == value?.type) {
        //!!! todo: consider how & whether integrate this so that the warning becomes actionable
        if (process.env.NODE_ENV == "test") {
          this.logger.debug("warning from host", this.host.serverId, ":", value);
        } else {
          this.logger.warn("warning from host", this.host.serverId, ":", value);
        }
        continue;
      }
      const { mid, ocid, channel, nbh, type, msg, ...details } = value;
      const normalMessage = "normal message notification.  Connection manager should aggregate messages and deduplicate, while notifying clients of the new message.";
      const errorMessage = "this indicates an internal problem being reflected out to you for any appropriate client-side treatment of the condition";
      const devInfo = "error" === type ? errorMessage : normalMessage;
      this.events.emit("message", {
        connection: this,
        message: "msg received in chan",
        mid,
        ocid,
        type,
        msg,
        channel,
        details,
        neighborhood: nbh,
        ts,
        [devMessage]: devInfo
      });
    }
  }
  isAbortError(e) {
    return "AbortError" === e.name;
  }
  heartbeatReceived() {
    const now = (/* @__PURE__ */ new Date()).getTime();
    this.lastHeartbeat = now;
    if (this.heartbeatTimer) clearTimeout(this.heartbeatTimer);
    this.heartbeatTimer = setTimeout(this.watchdog, 3 * this.heartbeatInterval);
    this.heartbeatTimer.unref && this.heartbeatTimer.unref();
  }
  watchdog() {
    const now = (/* @__PURE__ */ new Date()).getTime();
    if (this.lastHeartbeat + 1.1 * this.heartbeatInterval < now) {
      console.warn("Missed expected heartbeat from server", this.host.serverId);
    }
    if (this.lastHeartbeat + 3 * this.heartbeatInterval < now) {
      console.error("Missed 3 expected heartbeats from server!!!", this.host.serverId);
      //!!! todo: this.events.emit("dead")
    }
  }
};
__publicField$a(_HostConnection, "emitterHelp", connectionEvents);
__decorateClass$2([
  autobind
], _HostConnection.prototype, "watchdog");
let HostConnection = _HostConnection;

async function asyncDelay(wait) {
  return new Promise((resolve) => {
    setTimeout(resolve, wait);
  });
}

async function fetcher(path, options) {
  const { host, debug = false, parse = true, ...reqInit } = options;
  if (path[0] !== "/") path = `/${path}`;
  const proto = host.insecure ? "http" : "https";
  const shortServer = `${host.address}:${host.port}`;
  const url = `${proto}://${shortServer}${path}`;
  const result = await fetch$1(url, reqInit);
  if (debug) debugger;
  //! successful requests are directly resolved to the parsed json ...
  if (result.ok) {
    if (!parse) return result;
    return result.json();
  }
  //! failed requests @request or parsing level cause a rejection.
  const reason = await result.json().catch((r) => {
    return new Error(`${result.status} ${result.statusText} for ${path}`);
  });
  if (!(reason instanceof Error)) {
    const t = new Error(`${result.status} ${result.statusText} for ${path}`);
    t.cause = result;
    throw t;
  }
  throw reason;
}

var __defProp$9 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __defNormalProp$9 = (obj, key, value) => key in obj ? __defProp$9(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$1(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result) __defProp$9(target, key, result);
  return result;
};
var __publicField$9 = (obj, key, value) => __defNormalProp$9(obj, typeof key !== "symbol" ? key + "" : key, value);
const { cyan, dim } = colors;
//!!! todo zw3w737: it has a way of posting the same unique message to multiple servers,
const connectionManagerStates = {
  // logLevel: "info",
  discoveringNbh: {
    default: true,
    async onEntry() {
      //! it moves directly to host discovery if there is already a nbh
      if (this.discovery.hasNeighborhood()) {
        return this.transition("setupPending");
      } else {
        this.events.emit("needsNeighborhood", {
          message: "select a neighborhood",
          // recommendation: "",
          [devMessage]: [
            "choose a default neighborhood if that fits your application's needs, ",
            "and/or give the user a default or choice based on neighborhood discovery.",
            "Set a default neighborhood with the new DredClient{{neighborhood}) option",
            "...or, use \u2039clientObject\u203A.discovery.setNeighborhood(nbhId)"
          ]
        });
      }
    },
    setupPending: "pendingSetup",
    updatedHostList: "pendingSetup"
  },
  pendingSetup: {
    async onEntry() {
      const chans = this.channelListeners ? expandChannelListeners(this.channelListeners) : [];
      if (!chans.length && this.connectionSettings.watchChannels) {
        this.channelListeners = {
          type: "mapped",
          subs: {
            [nbhChannelListChannel]: new ChannelSubscriptionListener({
              channel: nbhChannelListChannel,
              logger: this.logger,
              options: {
                bookmark: "0"
              },
              listener: ({
                channel,
                mid,
                ocid,
                message,
                details,
                neighborhood,
                connection
              }) => {
                this.debug(" \u{1F41E} in _chans: ", {
                  channel,
                  mid,
                  ocid,
                  message,
                  details,
                  neighborhood
                  //connection,
                });
              }
            })
          }
        };
      }
      const hosts = this.discovery.hosts;
      if (hosts?.length && !this.hosts) {
        this.hosts = hosts;
      }
      if (chans.length && this.hosts?.length) return this.transition("readyToConnect");
      if (!this.hosts?.length) {
        this.progress("    \u{1F41E}  pendingSetup: waiting for host discovery");
      }
      if (!chans.length) {
        this.progress("    \u{1F41E}  pendingSetup: waiting for subscriptions");
      }
    },
    updatedHostList: { nextState: "pendingSetup", reEntry: true },
    hasSubscriptions: { nextState: "pendingSetup", reEntry: true },
    readyToConnect: "connecting",
    disconnected: {
      // predicate() {
      //     console.log(new Error("stack"))
      //     debugger
      //     return true;
      // },
      nextState: "disconnected"
    }
  },
  replacingSubs: {
    // equivalent to connecting, except:
    //   * quieter (no separate "connecting" event)
    partial: "degraded",
    sufficient: "healthy"
  },
  connecting: {
    async onEntry() {
      this.events.emit("connecting", {
        message: "establishing connections to neighborhood hosts",
        [devMessage]: [
          `The connection manager is starting to connect to hosts.`,
          `Update users with the info and monitor other events for further progress`
        ]
      });
      this.connectToHosts();
    },
    updatedHostList: {
      nextState: "connecting",
      reEntry: true
    },
    sufficient: "healthy",
    partial: "partiallyConnected",
    replaceSubs: "replacingSubs",
    disconnected: "disconnected"
  },
  partiallyConnected: {
    onEntry() {
      this.emitPartialConnectEventIfNeeded();
    },
    // "connectedOne": "addedConnection",
    sufficient: "healthy",
    partial: "partiallyConnected"
  },
  healthy: {
    async onEntry() {
      if (this.previousState) throw new Error("hurray, we can change this next line");
      const previousState = this.currentState;
      //! it notifies interested clients when the connection count has become sufficient.
      if (["disconnected", "degraded"].includes(previousState)) {
        this.events.emit("connected", {
          message: "restored neighborhood connectivity",
          //! it helps clients clear any warnings that may have been present
          //  for security / realtime applications
          altMessageSecurity: "",
          altMessageRealtime: "",
          [devMessage]: "consider displaying the message briefly, to reassure the user"
        });
      } else {
        this.events.emit("connected", {
          message: "connected to neighborhood",
          //!!! todo? include a count of connected hosts, here or in another spot
          //   ... even if that's only for dApp developer transparency and we guide them
          //   to avoid creating unnecessary complication by default in their UX
          //! it helps clients clear any warnings that may have been present
          //  for security / realtime applications
          altMessageSecurity: "",
          altMessageRealtime: "",
          [devMessage]: "consider displaying the message briefly, to reassure the user"
        });
      }
    },
    sufficient: {
      //! it can withstand being transitioned (back) to sufficient any time the active
      //  connection-count changes, without triggering extraneous events
      nextState: "healthy",
      reEntry: false
    },
    disconnected: "disconnected",
    partial: "degraded",
    updatedHostList: "connecting"
  },
  degraded: {
    async onEntry() {
      this.events.emit("connect:minimal", {
        message: "...trying to improve neighborhood connectivity",
        altMessageRealtime: "messages may be delayed",
        altMessageSecurity: "for improved security, please hold while connectivity is restored",
        [devMessage]: [
          `The connection manager still has some connections to neighborhood hosts,`,
          ` ... but fewer than preferred for redundancy, security, and tolerance to further faults.`,
          `Realtime or security-critical applications may consider using one of the altMessages and/or 'message'.`,
          `The connection manager will retry and add connections to other neighborhood hosts if possible,`,
          ` ... to re-achieve a healthy level of connectivity; it will issue a 'connected' event at that time`
        ]
      });
    },
    sufficient: "sufficient",
    updatedHostList: "connecting"
  },
  disconnecting: {
    async onEntry() {
      this.events.emit("disconnecting", {
        message: "disconnecting from neighborhood hosts",
        [devMessage]: [`disconnecting on request (probably from client object)`]
      });
      this.disconnect();
    },
    disconnected: "disconnected"
  },
  disconnected: {
    async onEntry() {
      //!!! todo: check prior state and tune the message to fit those conditions.
      this.events.emit("disconnected", {
        message: "we're having trouble maintaining neighborhood connectivity",
        recommendation: "check your network connection and/or have patience",
        altMessageRealtime: "you may experience messaging delays",
        altMessageSecurity: "wait for resolution before continuing",
        [devMessage]: ["tbd"]
      });
    },
    reconnect: "connecting",
    sufficient: "disconnected"
  }
};
class ConnectionManager extends StateMachine$1.withDefinition(
  connectionManagerStates,
  "connMgr"
) {
  constructor(options) {
    super({
      contextLabel: "connection-manager",
      currentState: "discoveringNbh",
      logFacility: "connection-manager:state",
      contextObject: null,
      logProperties: {
        loggerId: options.clientid,
        color: cyan.start + dim.start
      }
    });
    __publicField$9(this, "state", "pending");
    __publicField$9(this, "discovery");
    __publicField$9(this, "hosts");
    __publicField$9(this, "events", new EventEmitter());
    __publicField$9(this, "waitFor");
    //! it keeps a current list of target event-subscriptions
    __publicField$9(this, "channelListeners");
    //! it remembers the last set of subscriptions, while the next set is being established.
    __publicField$9(this, "lastChannelSubs");
    //! it is initialized with connection settings used for tuning behavior of outgoing connections
    __publicField$9(this, "connectionSettings");
    __publicField$9(this, "bookmarkStorage");
    //! it can map from the host object to a best-known Connection object for that host.
    __publicField$9(this, "hostToConn", /* @__PURE__ */ new Map());
    //! it keeps notes on the status of every connection it knows about, and can count the connections in each state
    __publicField$9(this, "connStatus", /* @__PURE__ */ new Map());
    //! it keeps a graveyard of connections that can drop out of the set anytime they're garbage-collected,
    //  for connections that are known to be obsolete / replaced by newer versions, but which might still get / emit
    //  some events while they wrap up their operations.
    __publicField$9(this, "graveyard", /* @__PURE__ */ new WeakSet());
    __publicField$9(this, "partialConnectNotification");
    __publicField$9(this, "_status");
    __publicField$9(this, "channels");
    __publicField$9(this, "clientid");
    __publicField$9(this, "logger");
    this.clientid = options.clientid;
    this.logger = zonedLogger("connMgr", {
      loggerId: options.clientid,
      color: cyan.start + dim.start
    });
    this.connectionSettings = HostConnection.settingsWithDefaults(options.connectionSettings);
    this.discovery = options.discovery;
    this.bookmarkStorage = options.bookmarkStorage;
    this.discovery.events.on("hosts:updated", this.setHostList);
    this.waitFor = options.waitFor;
    this.transition("default");
  }
  getThresholds() {
    return this.discovery.getConnectionThresholds();
  }
  // assigned by state-machine
  //@ts-expect-error -  base class has void as return type.  fix when state machine gets typescript love.
  set currentState(v) {
    this._status = v;
  }
  //@ts-expect-error -  base class has void as return type.  fix when state machine gets typescript love.
  get currentState() {
    return this._status || this.defaultState;
  }
  error(message, ...args) {
    this.logger.error(message, ...args);
  }
  warn(message, ...args) {
    this.logger.warn(message, ...args);
  }
  info(message, ...args) {
    this.logger.info(message, ...args);
  }
  progress(message, ...args) {
    this.logger.progress(message, ...args);
  }
  debug(message, ...args) {
    this.logger.debug(message, ...args);
  }
  trace(message, ...args) {
    this.logger.trace(message, ...args);
  }
  async setHostList({ hosts: newHosts }) {
    if (this.hosts) {
      this.retireObsoleteConnections(newHosts);
    }
    this.hosts = newHosts;
    this.transition("updatedHostList");
  }
  retireObsoleteConnections(updatedHosts) {
    //!!! todo: implement retireObsoleteConnections
    //! it removes connections to hosts that aren't in the updated host list.
  }
  async getChannelList() {
    //!!! todo: ensure that channels are always fresh (watch host connections for updates in '_chans' stream)
    if (!this.hosts) {
      if (this.discovery.hosts?.length) {
        this.hosts = this.discovery.hosts;
      } else {
        throw new Error(`no hosts discovered yet`);
      }
    }
    const channels = /* @__PURE__ */ new Set();
    for (const host of this.hosts) {
      try {
        const { channels: foundChans } = await fetcher("/channels", {
          host,
          headers: {
            "content-type": "application/json",
            accept: "application/json",
            clientid: this.clientid
          }
        });
        for (const chan of foundChans) {
          if (!channels.has(chan)) {
            this.events.emit("channel:added", {
              nbh: this.discovery.nbh,
              channel: chan,
              message: "new channel discovered",
              [devMessage]: [
                "ensure this channel makes it into the state of the client & application"
              ]
            });
          }
          channels.add(chan);
        }
        return this.channels = [...channels];
      } catch (e) {
        console.warn(`host ${host.address}:${host.port}: fetching /channels failed: `, e);
      }
    }
    return [];
  }
  // async getPeers(): PromisedPeers<T> {
  //     if (this.peerCache) return this.peerCache;
  //     return (this.peerCache = await this.discovery.getHostList());
  // }
  // async _discover(): PromisedPeers<T> {
  //     this.state = "discovering";
  //     return this.discoverPeers();
  // }
  disconnect() {
    //! it tells each host connection to disconnect
    for (const [host, connection] of this.hostToConn.entries()) {
      connection.disconnect("due to connection manager disconnect()");
      this.moveConnTo(connection, "obsolete");
    }
    this.transition("disconnected");
  }
  async setSubscriptions(listeners) {
    const channels = expandChannelListeners(listeners);
    this.debug(
      `setSubscriptions (%s): %d channels ${this.channelListeners ? " (replace)" : ""}`,
      listeners.type,
      channels.length,
      channels.length
    );
    this.trace("channels: %s", channels.join(", "));
    if (this.channelListeners) return this.replaceSubscriptions(listeners);
    this.channelListeners = listeners;
    if (!this.hosts) {
      if (this.discovery.hosts?.length) {
        this.hosts = this.discovery.hosts;
      } else {
        this.info("setSubscriptions: waiting for hosts:ready from discovery");
        await new Promise((resolve) => this.discovery.events.once("hosts:ready", resolve));
        this.info("setSubscriptions: discovery: hosts:ready - excellent!");
      }
    }
    if (this.currentState == "pendingSetup") {
      this.debug("setSubscriptions: releasing pendingSetup state");
      await this.transition("readyToConnect");
    }
    await this.once("connected");
    return listeners;
  }
  async replaceSubscriptions(listeners) {
    expandChannelListeners(listeners);
    this.lastChannelSubs = this.channelListeners;
    this.channelListeners = listeners;
    const promises = [];
    for (const host of this.hostToConn.keys()) {
      promises.push(this.replaceHostConnection(host));
    }
    Promise.all(promises).then(() => {
      this.lastChannelSubs = void 0;
    });
    if (this.currentState == "pendingSetup") {
      await this.transition("readyToConnect");
    }
    this.debug(
      "replaceSubscriptions: waiting for one of %d promises to resolve",
      promises.length
    );
    await Promise.race(promises);
    this.progress("replaceSubscriptions: got connected");
    return listeners;
  }
  connectToHosts() {
    if (!this.hosts) {
      if (this.discovery.hosts?.length) {
        this.hosts = this.discovery.hosts;
      } else {
        throw new Error(`no hosts; discovery not complete?`);
      }
    }
    for (const h of this.hosts) {
      const foundConn = this.hostToConn.get(h);
      if (foundConn) {
        //!! todo: it recycles host connections, if they have a full match with current channelSubs
        this.replaceHostConnection(h);
      } else {
        this.connectTo(h);
      }
    }
  }
  connectTo(host) {
    if (!this.channelListeners)
      throw new Error(
        // makes typescript happy
        `missing channelSubs; should already have a reasonable default value`
      );
    debugger;
    //! it gathers a list of channels and subscription settings to use for this connection
    const subscriptions = [];
    for (const sub of Object.values(this.channelListeners.subs)) {
      subscriptions.push(sub.config);
    }
    if (this.channelListeners.type == "mass") {
      const { bookmarks: channelBookmarks } = this.channelListeners;
      this.channelListeners.channels.forEach((x) => {
        subscriptions.push({
          channel: x,
          options: {
            bookmark: channelBookmarks[x]
          }
        });
      });
    }
    if (!this.clientid) throw new Error("missing clientid");
    const conn = new HostConnection({
      host,
      settings: this.connectionSettings,
      clientid: this.clientid,
      subscriptions
    });
    conn.events.once("connected", this.healthyConnection);
    conn.events.once("disconnected", this.cleanupConnection);
    conn.events.once("replacedBy", this.cleanupConnection);
    conn.events.once("failed", this.cleanupConnection);
    conn.events.on("message", this.notifySubscribers);
    //!!! todo c1hxed4: consider use-cases in order to to ensure that any important needs of connection manager's
    this.hostToConn.set(host, conn);
    this.moveConnTo(conn, "pending");
    return conn;
  }
  healthyConnection(event) {
    const { connection, message: msg } = event;
    //! it records the active state of the connection
    this.moveConnTo(connection, "active");
    this.progress(`healthy: ${connection.host.address}`);
    //! it does NOT need to trigger event 'replacedBy', because replaceHostConnection() takes that responsibility
    this.checkConnectionState();
  }
  cleanupConnection(event) {
    const { connection, message } = event;
    this.debug("cleanup: ", connection.host.address, message);
    this.moveConnTo(connection, "disconnected");
    this.graveyard.add(connection);
  }
  notifySubscribers(event) {
    const { channel } = event;
    const { channelListeners } = this;
    if (!channelListeners) {
      this.warn("no listeners to hear about:", event);
      return;
    }
    let sub = channelListeners.subs[channel];
    if (!sub && channelListeners.type === "mass") {
      sub = channelListeners.massHandler;
    }
    if (!sub) {
      debugger;
      this.warn(`no subscription for channel ${channel}`, event);
      return;
    }
    if (event.type == "channel:genesis") {
      this.trace("suppressing notification of genesis event in channel %s", channel);
      return;
    }
    try {
      sub?.notify(event);
    } catch (e) {
      this.logger.error(`error in subscriber for channel ${channel}: %s`, e.stack || e.message || e);
    }
  }
  async replaceHostConnection(host) {
    const replacingConn = this.hostToConn.get(host);
    const replacement = this.connectTo(host);
    //! it starts a replacement connection and hopes to complete the new connection quickly.
    return new Promise((resolve, reject) => {
      let timeout;
      replacement.events.once("connected", ({ connection }) => {
        this.debug("replaceHostConnection: connected to new host");
        const oldConnection = replacingConn;
        //! if it completes quickly, the original connection is seamlessly replaced in the active-connections list
        oldConnection?.replacedBy(replacement);
        //! if the connection didn't connect promptly and was moved to pending, it's made active when connected
        this.moveConnFromTo(replacement, "pending", "active");
        //! it moves the old connection
        oldConnection && this.moveConnTo(oldConnection, "obsolete");
        oldConnection && this.graveyard.add(oldConnection);
        if (!timeout) {
          timeout = false;
          this.progress("replaceHostConnection: resolving new connection");
          resolve(replacement);
        } else {
          this.debug("replaceHostConnection: NOT resolving new connection after timeout");
        }
      });
      //! if the new connection doesn't connect promptly, it...
      asyncDelay(this.connectionSettings.connectionWaitTimeMs).then(() => {
        this.moveConnTo(replacement, "pending");
        const oldConnection = replacingConn;
        this.debug("replaceHostConnection: moving old connection to obsolete");
        oldConnection && this.moveConnTo(oldConnection, "obsolete");
        if (timeout !== false) {
          timeout = true;
          this.progress("replaceHostConnection: resolving new connection after timeout");
          resolve(replacement);
        }
      });
    });
  }
  connected(connection, event) {
    const status = this.connStatus.get(connection);
    if (status == "obsolete") return;
    this.moveConnTo(connection, "active");
    const obsoleteConn = this.hostToConn.get(connection.host);
    if (obsoleteConn) {
      this.moveConnTo(obsoleteConn, "obsolete");
    }
    this.hostToConn.set(connection.host, connection);
  }
  //! it sets the status of a connection to a target state, only if the current state matches the indicated "from" state.
  moveConnFromTo(connection, from, target) {
    const current = this.connStatus.get(connection);
    if (from === current) this.connStatus.set(connection, target);
  }
  //! it moves the connection to a target state
  moveConnTo(connection, state) {
    this.connStatus.set(connection, state);
  }
  //! it emits a "connect:minimal" event after a brief delay, only if it's still
  //  partially-connected after other connections have had their chance
  //  and it didn't make it to a well-connected state.
  async emitPartialConnectEventIfNeeded() {
    if (this.partialConnectNotification) return;
    const unhappy = ["degraded", "minimally connected"];
    const pcn = this.partialConnectNotification = asyncDelay(
      this.connectionSettings.connectionWaitTimeMs
    );
    await pcn;
    if (unhappy.includes(this.state) && pcn === this.partialConnectNotification) {
      this.partialConnectNotification = void 0;
      this.events.emit("connect:minimal", {
        message: "partially connected to neighborhood",
        altMessageRealtime: `message delays are possible`,
        [devMessage]: [
          `There are a minimal number of connections to neighborhood hosts,`,
          ` ... but not as many as would be preferred for best operations.`,
          `Connection manager will work to restore connectivity.  Look for the 'connected' event`,
          ` ... to indicate restored health.`,
          `For security-centric applications, the minimal number of connections should`,
          ` ... already guard security outcomes, so this event does not imply a loss of security`
        ]
      });
    }
  }
  async checkConnectionState() {
    //! it checks all the peers for connection health
    const thresholds = await this.getThresholds();
    let healthyConnectionCount = 0;
    for (const [conn, status] of this.connStatus.entries()) {
      if (this.graveyard.has(conn)) continue;
      if (status === "active") healthyConnectionCount += 1;
    }
    if (healthyConnectionCount >= thresholds.healthy) {
      return this.transition("sufficient");
    }
    if (healthyConnectionCount > thresholds.minimal) {
      return this.transition("partial");
    }
    return this.transition("unhealthy");
  }
  async freshenPeers() {
    this.state = "refreshing";
    const newCache = await this.discovery.getHostList();
    if (newCache === this.hosts) {
      throw new Error(
        `discoverPeers returned the existing perCache; it must return a new Peer list`
      );
    }
    let i = 0;
    for (let newPeer of newCache) {
      const match = this.hosts?.find((cachedPeer) => this.areSamePeer(newPeer, cachedPeer));
      if (match) {
        newPeer = newCache[i] = match;
      }
    }
    //!!! it counts good connections and keeps health-state accurate
    return this.hosts = newCache;
  }
  newState(cs) {
    this.state = cs;
    //!!! add eventListener and notify those listeners.
  }
  // async connectToPeers(): PromisedHostDetails {
  //     const promises: Array<Promise<Peer<T>>> = [];
  //     const connectedPeers: DredHostDetails[];
  //     const peers = this.freshenPeers();
  //     const thrs = await this.getThresholds();
  //     let startTime = new Date().getTime(),
  //         resolver: Function,
  //         rejecter: Function,
  //         resolved: Boolean,
  //         rejected: Boolean,
  //         seenErrors: Error[],
  //         successCount = 0,
  //         rejectCount = 0;
  //     function resolveMe(result) {
  //         if (resolved || rejected) return;
  //         resolved = true;
  //         resolver(result);
  //     }
  //     function rejectMe(error) {
  //         if (resolved || rejected) return;
  //         rejected = true;
  //         rejecter(error);
  //     }
  //     const checkPartialSuccess = () => {
  //         //! it resolves immediately when enough successes have accumulated,
  //         //   compared to the requested 'waitFor' threshold.
  //         if (connectedPeers.length > thrs.minimal) {
  //             //! During initial connection sequence, it notifies listeners as soon as
  //             //  it has established some connectivity, for progress reporting to end-user.
  //             this.optionalTransition("partial");
  //         }
  //         if (connectedPeers.length >= thrs[this.waitFor]) {
  //             console.log("connected to peers", connectedPeers.length);
  //             resolveMe(peers);
  //         }
  //         //! it throws an error if it can't connect to enough peers
  //         if (peers.length - rejectCount < thrs.minimal) {
  //             console.error("Error connecting to enough peers");
  //             if (successCount) {
  //                 this.newState("underconnected");
  //                 const msg = `Connected to only ${successCount} peers, out of ${thrs.minimal} needed for convergence`;
  //                 console.error(msg);
  //                 //!!! todo: consider: in development, we should fake a cycle through all possible states
  //                 rejectMe(
  //                     new Error(msg, {
  //                         cause: {
  //                             partial: true,
  //                             "?developer?": {
  //                                 note: "more peers can connect later, and any reconnecting peers may result in a later improvement",
  //                                 guidance:
  //                                     "don't let the user think everything is fine and dandy!  Not having enough connectivity for convergence means YOU DON'T KNOW THE STATE OF THE CHANNEL!",
  //                             },
  //                             seenErrors,
  //                             recommendation:
  //                                 "Warn the user with this error.message, and use a read-only UI until decentralization score improves",
  //                             suggestion:
  //                                 "consider rendering any locally-cached data if possible and use a read-only or offline state in your user-experience",
  //                         },
  //                     })
  //                 );
  //             } else if (this.state == "connecting") {
  //                 const msg = `Not connected to any peers`;
  //                 console.error(msg);
  //                 this.newState("disconnected");
  //             }
  //             //!!! todo: make the following details available under this.getMoreInfo
  //             //     and this.developerGuidance
  //             const msg = `Can't connect to any peers. ${thrs.minimal} are needed for convergence`;
  //             console.error(msg);
  //             rejectMe(
  //                 new Error(msg, {
  //                     cause: {
  //                         partial: false,
  //                         note: "Reconnecting peers may result in a later improvement",
  //                         guidance:
  //                             //!!! guides developer to use reconnect() or its final and correct name
  //                             " wait for retries to succeed, or use reconnect()",
  //                         seenErrors,
  //                         recommendation:
  //                             "Emit this error.message into your UI, and keep monitoring for continuing state changes",
  //                         suggestion:
  //                             "consider rendering any locally-cached data if possible and use a read-only or offline state",
  //                     },
  //                 })
  //             );
  //         }
  //         const now = new Date().getTime();
  //         //@ts-expect-error - remove the fallback and/or adjust the code to get same result
  //         //   out of the state machine
  //         if (now - startTime > this.connectionSettings.connectionWaitTimeMs || 5000) {
  //             //! resolves successfully if it can connect to at least the minimal number of peers
  //             //   after waiting for the timeout, even if waitFor: "healthy" is specified.
  //             if (successCount > thrs.minimal) {
  //                 resolveMe(peers);
  //             }
  //         }
  //     };
  //     const myPromise = new Promise((res, rej) => {
  //         (resolver = res), (rejecter = rej);
  //     }) as PromisedHostDetails;
  //     for (const p of peers) {
  //         let retries = 0;
  //         let myLastError: Error;
  //         const pp = this.tryOneConnection(p).then(
  //             () => {
  //                 console.log("connected to peer", p);
  //                 if (resolved) return;
  //                 successCount += 1;
  //                 connectedPeers.push(p);
  //                 checkPartialSuccess();
  //             },
  //             (error) => {
  //                 rejectCount += 1;
  //                 seenErrors.push(error);
  //                 myLastError = error;
  //                 checkPartialSuccess();
  //                 //! retries any failed connections
  //                 this.tryOneConnection(p).then(
  //                     (success) => {
  //                         console.log("CM: success after retry on peer", p);
  //                         //! todo: write the real code for this:
  //                         //   seenErrors.deleteAt(myLastError):
  //                         rejectCount -= 1;
  //                         successCount += 1;
  //                         checkPartialSuccess();
  //                     },
  //                     (failure) => {
  //                         console.log("CM: giving up after one retry on peer", p);
  //                         //! for now, it retries each connection only once.
  //                         //!!! todo: use exponential retry (exponents of 1.27 starting at ~500ms)
  //                     }
  //                 );
  //             }
  //         );
  //         promises.push(pp as any);
  //     }
  //     return myPromise;
  // }
  areSamePeer(p1, p2) {
    return p1.address == p2.address && p1.port == p2.port && p1.serverId == p2.serverId && p1.publicKey == p2.publicKey;
  }
  async once(eventName) {
    return new Promise((resolve) => {
      this.events.once(eventName, (...args) => {
        resolve(args);
      });
    });
  }
}
__decorateClass$1([
  autobind
], ConnectionManager.prototype, "setHostList");
__decorateClass$1([
  autobind
], ConnectionManager.prototype, "healthyConnection");
__decorateClass$1([
  autobind
], ConnectionManager.prototype, "cleanupConnection");
__decorateClass$1([
  autobind
], ConnectionManager.prototype, "notifySubscribers");

var __defProp$8 = Object.defineProperty;
var __defNormalProp$8 = (obj, key, value) => key in obj ? __defProp$8(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$8 = (obj, key, value) => __defNormalProp$8(obj, typeof key !== "symbol" ? key + "" : key, value);
const { encodeUTF8: encodeUTF8$2, decodeUTF8: decodeUTF8$2, encodeBase64: encodeBase64$2, decodeBase64: decodeBase64$2 } = util;
class StringNacl {
  constructor(keyPair, logger = console) {
    __publicField$8(this, "identity");
    __publicField$8(this, "logger");
    this.identity = keyPair;
    this.logger = logger;
  }
  async sign(s) {
    if (!this.identity)
      throw new Error(`StringNacl: missing keyPair for signing`);
    const buf = decodeUTF8$2(s);
    const sigBuf = await sign$1(buf, this.identity.secretKey);
    const sigStr = encodeBase64$2(sigBuf);
    return sigStr;
  }
  async verifySig(s, sigBase64, keyBase64) {
    let strBuf, sigBuf, keyBuf;
    try {
      strBuf = decodeUTF8$2(s);
    } catch (e) {
      this.logger.warn("failure to decode string:", e.message);
      return false;
    }
    try {
      sigBuf = decodeBase64$2(sigBase64);
    } catch (e) {
      this.logger.warn("failure to decode signature:", e.message);
      return false;
    }
    try {
      keyBuf = decodeBase64$2(keyBase64);
    } catch (e) {
      this.logger.warn("failure to decode pubkey:", e.message);
      return false;
    }
    return verify(strBuf, sigBuf, keyBuf);
  }
}
__publicField$8(StringNacl, "newKeyPair", newKeyPair);

var __defProp$7 = Object.defineProperty;
var __defNormalProp$7 = (obj, key, value) => key in obj ? __defProp$7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$7 = (obj, key, value) => __defNormalProp$7(obj, typeof key !== "symbol" ? key + "" : key, value);
class NeighborhoodDiscovery extends Discovery {
  constructor(options) {
    const { neighborhood } = options;
    super(options);
    __publicField$7(this, "capo");
    __publicField$7(this, "registryController");
    __publicField$7(this, "neighborhood");
    if (neighborhood) this.neighborhood = neighborhood;
  }
  async myServerInfo(serverId) {
    const address = process.env.LISTEN_ADDRESS || "127.0.0.1";
    const port = process.env.LISTEN_PORT ? Number(process.env.LISTEN_PORT) : 3029;
    return {
      address,
      port,
      serverId: process.env.DRED_NODE_ID || "UNKNOWN-NODE-ID",
      publicKey: "publicKey",
      pubKeyHash: "pubKeyHash"
    };
  }
  static async forNeighborhood(n) {
    const discovery = new this({ neighborhood: n });
    await discovery.initHostDiscovery();
    return discovery;
  }
  async initHostDiscovery() {
    const network = process.env.CARDANO_NETWORK;
    const bfKey = process.env.BF_API_KEY;
    if (!bfKey) throw new Error("required env variable BF_API_KEY is not set");
    if (!network) throw new Error("required env variable CARDANO_NETWORK is not set");
    const bf = makeBlockfrostV0Client(network, bfKey);
    const entropy = makeRandomRootPrivateKey().entropy;
    const privKeyHex = bytesToHex(entropy);
    const privKey = makeRootPrivateKey(hexToBytes(privKeyHex));
    const simpleWallet = makeSimpleWallet(privKey, bf);
    const batcherOptions = {
      submitters: {
        blockfrost: bf
      },
      ...simpleWallet ? {
        signingStrategy: new GenericSigner(simpleWallet)
      } : {}
    };
    this.logger.info("Creating capo with simple wallet");
    const capo = await DredCapo.createWith({
      setup: {
        network: bf,
        networkParams: await bf.parameters,
        txBatcher: new TxBatcher(batcherOptions),
        actorContext: {
          wallet: simpleWallet,
          others: {}
        },
        isMainnet: network === "mainnet",
        optimize: true
      }
    });
    this.logger.info("Capo created");
    this.capo = capo;
    this.registryController = await capo.getNodeRegistryController();
    this.logger.info("Registry controller created");
  }
  // async getNeighborhoods() {
  //     return ["cardano-after-dark"]; //!!! todo: use discovery service to find registered neighborhoods
  // }
  async getHostList() {
    this.logger.info("Getting host list");
    const hosts = await this.registryController.findRecords();
    const capo = this.capo;
    const capoUtxos = await capo.findCapoUtxos();
    this.logger.info("utxos:", capoUtxos.length);
    const charterData = await capo.findCharterData(void 0, {
      optional: false,
      capoUtxos
    });
    const nodeEntries = await capo.findNodeOpEntries({
      capoUtxos,
      charterData
    });
    console.log(hosts.map((h) => h.data));
    this.logger.info(`^ found ${hosts.length} hosts in neighborhood ${this.neighborhood}`);
    const allNodes = nodeEntries.map((h) => {
      const details = {
        address: h.data.nodeDetails.address,
        port: h.data.nodeDetails.port,
        serverId: bytesToText(h.data.id),
        publicKey: h.data.nodeDetails.pubKey.toString(),
        pubKeyHash: h.data.nodeDetails.pubKeyHash.toString()
      };
      return details;
    });
    const nodeId = process.env.DRED_NODE_ID;
    if (nodeId) {
      const filteredNodes = allNodes.filter((node) => node.serverId !== nodeId);
      this.logger.info(
        `Filtered out self-node: ${allNodes.length} -> ${filteredNodes.length} hosts`
      );
      return filteredNodes;
    }
    return allNodes;
  }
  async getConnectionThresholds() {
    //!!! todo: revisit this, perhaps with neighborhood-specific preferences found in discovery,
    return this.clientRedundancyThresholds();
  }
  async serverRedundancyThresholds() {
    if (!this.hosts) {
      throw new Error(`no this.hosts`);
    }
    const count = this.hosts.length;
    if (count > 7) {
      return {
        minimal: 1 + Math.floor(count / 2),
        healthy: Math.ceil(count * 2 / 3)
      };
    }
    if (count > 2) {
      const minimal = 1 + Math.floor(count / 2);
      return {
        minimal,
        healthy: minimal + 1
      };
    }
    if (count > 1) {
      return { minimal: 1, healthy: 2 };
    }
    return { minimal: 1, healthy: 1 };
  }
  async clientRedundancyThresholds() {
    //! it provides some reasonable defaults for getting "enough" connectivity
    if (!this.hosts) {
      throw new Error(`no this.hosts`);
    }
    const count = this.hosts.length;
    if (count > 7) {
      return {
        minimal: 3,
        healthy: 4
      };
    }
    if (count > 3) {
      return {
        minimal: 2,
        healthy: 3
      };
    }
    if (count > 1) {
      return { minimal: 1, healthy: 2 };
    }
    return { minimal: 1, healthy: 1 };
  }
}

var __defProp$6 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result) __defProp$6(target, key, result);
  return result;
};
var __publicField$6 = (obj, key, value) => __defNormalProp$6(obj, typeof key !== "symbol" ? key + "" : key, value);
const { sign } = nacl;
const {
  yellowBright,
  bgMagenta,
  magenta
} = colors;
const { encodeUTF8: encodeUTF8$1, decodeUTF8: decodeUTF8$1, encodeBase64: encodeBase64$1, decodeBase64: decodeBase64$1 } = util;
parseInt(process.env.LOGGING || "");
//! it runs onEntry() and predicate() hooks always in context
const clientStates = {
  // logLevel: "warn",
  default: {
    //! it automatically advances to next states, when it can make progress
    async onEntry() {
      if (this.args.neighborhood) return this.transition("nbhSelected");
      return this.transition("findNbhs");
    },
    findNbhs: "findingNbhs",
    nbhSelected: "discoveringHosts"
  },
  findingNbhs: {
    async onEntry() {
      await this.getNeighborhoods();
      await this.transition("needsNbhSelection");
      return;
    },
    needsNbhSelection: "selectingNbh"
  },
  selectingNbh: {
    async onEntry() {
      this.events.emit("needsNeighborhood", {
        message: "select a neighborhood",
        [devMessage]: "Developers: offer these nbhs to a user or pick one by policy.  Call client.setNeighborhood(nbhId) to proceed.",
        nbhs: this.availableNeighborhoods
      });
    },
    nbhSelected: "discoveringHosts"
  },
  discoveringHosts: {
    async onEntry() {
      //! it completes the transition WITHOUT waiting for host discovery,
      {
        this.discovery.getHostList().then(this.mkTransition("haveHostList"));
      }
      return;
    },
    haveHostList: "discoveringChannels"
  },
  discoveringChannels: {
    async onEntry() {
      const chans = await this.connManager.getChannelList();
      this.channels = chans;
      await this.transition("hasChannels");
      this.emitHasChannels();
    },
    hasChannels: "ready"
  },
  ready: {
    async onEntry() {
    }
  }
};
let instanceCount = 1;
class DredClient extends StateMachine$1.withDefinition(clientStates, "client") {
  constructor(args) {
    let {
      name: clientName,
      neighborhood,
      bookmarkStorage
    } = args;
    const clientid = (clientName || `#${instanceCount}`) + `-${nanoid(5)}`;
    super({
      contextLabel: clientName || "dred-client",
      currentState: "default",
      logFacility: `dred-client:state`,
      contextObject: null,
      logProperties: {
        loggerId: clientid
      }
    });
    __publicField$6(this, "args");
    __publicField$6(this, "events", this.ensureEmitterExists());
    __publicField$6(this, "connManager");
    __publicField$6(this, "channels", []);
    __publicField$6(this, "neighborhood");
    // = "cardano-after-dark";
    __publicField$6(this, "availableNeighborhoods", []);
    // neighborhoodContractAddress = "9bef...";
    __publicField$6(this, "discovery");
    __publicField$6(this, "identity");
    __publicField$6(this, "signer");
    __publicField$6(this, "pubKeyString");
    __publicField$6(this, "logger");
    __publicField$6(this, "insecure");
    __publicField$6(this, "subscribers", /* @__PURE__ */ new Map());
    __publicField$6(this, "channelSub");
    __publicField$6(this, "authSub");
    __publicField$6(this, "instanceNumber", instanceCount++);
    __publicField$6(this, "clientid");
    __publicField$6(this, "bookmarkStorage");
    __publicField$6(this, "_messageHandler");
    __publicField$6(this, "_subscriptions");
    __publicField$6(this, "_status");
    __publicField$6(this, "subscriptionCache", {});
    if (!neighborhood) throw new Error("neighborhood is required");
    this.neighborhood = neighborhood;
    this.args = { ...args };
    this.events = this.ensureEmitterExists();
    this.clientid = clientid;
    this.bookmarkStorage = args.bookmarkStorage;
    this.logger = zonedLogger(`dred-client`, {
      color: magenta.start,
      loggerId: clientid
      // levels: {
      //     // [clientName]: logging ? "info" : "warn",
      //     _message: `(env LOGGING=${logging})`,
      // },
    });
    this._status = this._status || "default";
    const discovery = this.constructor.resolveDiscovery(args);
    this.discovery = discovery;
    this.connManager = this.mkConnectionManager();
    this.transition("default");
    //!!! make this test-only
  }
  mkConnectionManager() {
    return new ConnectionManager({
      discovery: this.discovery,
      waitFor: this.args.waitFor,
      connectionSettings: this.args.connectionSettings || {},
      clientid: this.clientid,
      bookmarkStorage: this.bookmarkStorage
    });
  }
  ensureEmitterExists() {
    return this.events = this.events || new EventEmitter();
  }
  info(a1, ...args) {
    this.logger.info(a1, ...args);
  }
  warn(a1, ...args) {
    this.logger.warn(a1, ...args);
  }
  progress(a1, ...args) {
    this.logger.progress(a1, ...args);
  }
  debug(a1, ...args) {
    this.logger.debug(a1, ...args);
  }
  trace(a1, ...args) {
    this.logger.trace(a1, ...args);
  }
  logInfo() {
    const neighborhood = this.neighborhood;
    const availableNeighborhoods = this.availableNeighborhoods.join(", ") || "none";
    const channels = this.channels.join(", ") || "none";
    const status = this._status || "unknown";
    let hostInfo = "unknown";
    if (this.discovery && this.discovery.hosts) {
      const hosts = this.discovery.hosts.map((h) => `${h.address}:${h.port} (${h.serverId})`);
      hostInfo = hosts.join(", ");
    }
    const logMessage = [
      `DredClient ${this.clientid}: ${status}`,
      `  - Current Neighborhood    : ${neighborhood}`,
      `  - Available Neighborhoods : [${availableNeighborhoods}]`,
      `  - Connected Channels      : [${channels}]`,
      `  - Connected Hosts         : ${hostInfo}`,
      `  - Subscriptions Count     : ${Object.keys(this.subscriptions).length}`,
      ``
    ].join("\n");
    return logMessage;
  }
  setNeighborhood(n) {
    this.neighborhood = n;
    asyncDelay$1(1).then(this.mkTransition("nbhSelected"));
  }
  /**
   * modifies the client's list of channel subscriptions
   * @remarks
   */
  async subscribeToChannels(listeners) {
    this.subscriptions = await this.connManager.setSubscriptions(
      // arg
      await this.mkChannelsListeners(listeners)
    );
  }
  onTransition() {
    //! tbd if we need to use this hook, perhaps for persisting the bookmark state of channels
  }
  emitHasChannels() {
    this.events.emit("hasChannels", {
      nbh: this.neighborhood,
      message: "found channel list",
      channels: this.channels,
      [devMessage]: [
        `The list of channels is ready to present to users, or has been refreshed.`,
        `You should reconcile any application-side list of subscribed channels`
      ]
    });
  }
  static resolveDiscovery({
    neighborhood,
    discovery
  }) {
    if (discovery) return discovery;
    if (neighborhood) discovery = new NeighborhoodDiscovery({ neighborhood });
    if (!discovery) throw new Error(`required: 'discovery' object or 'neighborhood' name`);
    return discovery;
  }
  //@ts-expect-error -  base class has void as return type.  fix when state machine gets typescript love.
  set currentState(v) {
    this._status = v;
    this.emitState();
  }
  //@ts-expect-error -  base class has void as return type.  fix when state machine gets typescript love.
  get currentState() {
    return this._status;
  }
  emitState() {
    this.ensureEmitterExists();
    this.events.emit("state:changed", {
      message: "client state updated",
      [devMessage]: "no need to show this message onscreen; just update channel-list or status as needed",
      nbh: this.neighborhood,
      status: this._status,
      channels: this.channels
    });
  }
  //! it creates a new subscriptions object
  //! it recycles existing subscriptions
  async mkChannelsListeners(listeners) {
    const namedListeners = listeners.type == "mapped" ? { ...listeners.subs } : listeners.type == "mass" ? {} : listeners;
    const subs = {};
    //! it watches for events relating to channel lifecycle
    subs[nbhChannelListChannel] = this.channelSub = await this.getChannelSub(
      nbhChannelListChannel,
      {
        listener: this.processChannelsMsg,
        //! it watches for events relating to channel lifecycle
        options: { bookmark: "0" }
      }
    );
    //! it watches for events relating to authentication lifecycle
    subs[nbhAuthInfoChannel] = this.authSub = await this.getChannelSub(
      nbhAuthInfoChannel,
      {
        listener: this.processAuthMsg,
        //! it watches for events relating to authentication lifecycle
        options: { bookmark: "0" }
      }
    );
    if (listeners.type === "mass") {
      let listener = listeners.massHandler;
      if (listener.listener) {
        listener = listener.listener;
      }
      const massListener = {
        type: "mass",
        channels: listeners.channels,
        bookmarks: Object.fromEntries(await Promise.all(
          listeners.channels.map(async (c) => [
            c,
            await this.bookmarkStorage.getBookmark(c)
          ])
        )),
        massHandler: await this.getChannelSub("*", {
          listener,
          options: { bookmark: "unused" }
        }),
        subs
      };
      return massListener;
    }
    let seq = Promise.resolve();
    Object.entries(namedListeners).forEach(([k, v]) => {
      seq = seq.then(async () => {
        this.logger.debug(`subscribing to channel ${k}`);
        subs[k] = await this.getChannelSub(k, v);
      });
    });
    await seq;
    const result = {
      type: "mapped",
      subs
    };
    return result;
  }
  processChannelsMsg(m) {
    this.bookmarkStorage.setBookmark(nbhChannelListChannel, m.mid);
    //!!! todo: it notifies client listeners about created or removed channels
    //!!! todo: it emits the generic state-updated event with updated channel list
  }
  processAuthMsg(m) {
    this.bookmarkStorage.setBookmark(nbhAuthInfoChannel, m.mid);
    //!!! todo: ??? it notifies listeners when authentication is required by one or more neighborhood hosts
    //!!! todo: it notifies listeners when a requested channel requires authentication not yet established
    //!!! todo: notifies listening application of new identities joining the neighborhood {type: "newId", pubKey, handle, certificates}
    //!!! todo: notifies listening application of any certifications added by an identity's owner or neighborhood trustees
    //!!! todo: notifies listening application of any key revocations or decertifications from owner or trustees
  }
  //! it unlistens from subscriptions no longer being used
  set subscriptions(replacement) {
    this._subscriptions = replacement;
  }
  // TODO: replace this with a direct `subscriptions` property
  get subscriptions() {
    //! it creates an empty subscriptions object if not already set
    if (!this._subscriptions)
      return {
        type: "mapped",
        subs: {}
      };
    return this._subscriptions;
  }
  async getChannelSub(channel, listener) {
    const found = this.subscriptionCache[channel];
    if (found?.listener === listener) return found;
    if (found) {
      this.logger.debug(`cached listener mismatch '${channel}'; replacing`);
    }
    const newSub = await this.mkChannelSub(channel, listener);
    this.subscriptionCache[channel] = newSub;
    return newSub;
  }
  //! it creates new subscriptions and wires them up for notification to client application
  //! it doesn't require client applications to guard for memory / event-listener leakage
  async mkChannelSub(channel, sListener) {
    const logger = zonedLogger(`listener:${channel}`, {
      color: `${bgMagenta.start}${yellowBright.start}`
    });
    const { options = {} } = sListener;
    let listener = sListener.listener ?? sListener;
    let bookmark = options.bookmark || await this.bookmarkStorage?.getBookmark(channel);
    const sub = new ChannelSubscriptionListener({
      channel,
      listener,
      options: {
        bookmark
      },
      logger
    });
    return sub;
  }
  //!!! todo: extract fetch as a library function so any client and/or connectionManager
  //      can avoiding reliance on any specific host from the neighborhood.
  //     ... starts at least two requests from discovered servers; if a confirmation is not received
  //     ... from neighborhood hosts within a short delay (~200ms),
  //     ... it issues the same req to additional servers,
  //     ... to get a decentralized confirmation of important functionalities
  //    (see also todo zw3w737)
  async fetch(path, { parse = true, debug = false, ...options }) {
    //!! todo: it logs the pending request to an observable queue of
    //!! todo: it exposes the progress info in a way that is easily consumed
    if (path[0] !== "/") path = `/${path}`;
    let host = this.discovery.hosts?.[0] || (await this.discovery.getHostList())[0];
    const proto = host.insecure ? "http" : "https";
    const shortServer = `${host.address}:${host.port}`;
    const url = `${proto}://${shortServer}${path}`;
    const result = await fetch$1(url, {
      ...options,
      headers: {
        ...options.headers,
        "content-type": "application/json",
        accept: "application/json",
        clientid: this.clientid
      }
    });
    if (debug) debugger;
    if (result.ok) {
      if (!parse) return result;
      return result.json();
    }
    const err = await result.json().catch(() => new Error(`${result.status} ${result.statusText} for ${path}`));
    //!!! if one of the requests fails, it notifies the PeerConnectionManager
    const { error, message, reason, recommendation, "?developer?": devMsg } = err;
    const m = message || error;
    this.events.emit("error", {
      reason: reason || err,
      message: `host said: ${m}`,
      recommendation: recommendation || "try again or choose a different channel",
      [devMessage]: devMsg || "Developers should check whether the request is properly formed"
    });
    throw new Error(error || message || reason);
  }
  /**
   * Promise-based wrapper for waiting for an event to occur
   * @remarks
   * The promise resolves with the event arguments.
   */
  async once(eventName) {
    return new Promise((resolve) => {
      this.events.once(eventName, (...args) => {
        resolve(args);
      });
    });
  }
  async getNeighborhoods() {
    const n = await this.discovery.getNeighborhoods();
    return n;
  }
  async generateKey() {
    if (this.identity) {
      console.warn(`generateKey() already called; no-op duplicate call`);
      return;
    }
    const key = this.identity = await StringNacl.newKeyPair();
    this.pubKeyString = encodeBase64$1(key.publicKey);
    this.signer = new StringNacl(this.identity, this);
  }
  async signString(s) {
    if (!this.identity || !this.signer)
      throw new Error(`DredClient: can't sign() without a prior call to generateKey()`);
    return this.signer.sign(s);
  }
  async verifySig(s, sigBase64, keyBase64) {
    if (!this.signer) {
      throw new Error(`DredClient: no signer; use generateKey() first`);
    }
    return this.signer.verifySig(s, sigBase64, keyBase64);
  }
  async createChannel(channelName, options = {
    encrypted: false
  }) {
    //!!! todo: it delegates channel-creation to connection manager (see also todo zw3w737)
    const {
      encrypted,
      members = [],
      allowJoining,
      memberLimit,
      expiresAt,
      messageLifetime
    } = options || {};
    if (encrypted) {
      if (!this.identity || !this.signer) {
        throw new Error(
          `createChannel: encrypted channel requires a prior call to generateKey()`
        );
      }
      if (!allowJoining && !members.length) {
        throw new Error(
          `createChannel (encrypted: true): must specify member list and/or allowJoining: true`
        );
      }
      const signature = await this.signString(channelName);
      options.owner = this.pubKeyString;
      options.signature = signature;
    }
    const { ...otherBodyAttrs } = options;
    const body = JSON.stringify(otherBodyAttrs);
    try {
      return this.fetch(`/channel/${channelName}`, {
        method: "POST",
        body,
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          clientid: this.clientid
        }
      }).then((r) => {
        const { id, status } = r;
        if (status === "created") {
          if (id !== channelName) {
            throw new Error(`requested channel ${channelName} but got id ${id}`);
          }
          this.logger.info(`created channel ${channelName}`, r);
          this.channels.push(channelName);
          this.logger.warn(
            "todo: consider waiting for a second confirmation of channel creation, if appropriate, from a second server (only if there are multiple servers and active channel subscriptions)"
          );
        } else {
          throw new Error(`expected status "created". Response: `, r);
        }
        return r;
      });
    } catch (err) {
      let e;
      if (err instanceof Error) {
        e = err;
      } else {
        console.warn(err.stack || err.message || JSON.stringify(err, null, 2));
        e = new Error(err.error || err.message || err);
      }
      this.logger.error("createChannel at server failed:", e.stack);
      throw e;
    }
  }
  async joinChannel(channelName) {
    if (!this.pubKeyString) {
      throw new Error(`joinChannel: requires a prior call to generateKey()`);
    }
    return this.addMemberToChannel(channelName, this.pubKeyString);
  }
  async addMemberToChannel(channelName, memberKeyBase64) {
    if (!this.pubKeyString) {
      throw new Error(`joinChannel: requires a prior call to generateKey()`);
    }
    try {
      //!!! todo: it delegates member-adds to connection manager (see todo zw3w737)
      return await this.fetch(`/channel/${channelName}/join`, {
        method: "POST",
        // debug: true,
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          clientid: this.clientid
        },
        body: JSON.stringify({
          myId: this.pubKeyString,
          member: memberKeyBase64,
          signature: await this.signString(memberKeyBase64)
        })
      });
    } catch (err) {
      this.logger.error("join-channel at server failed:", err.message || err);
      throw new Error(err.error || err);
    }
  }
  //!!! todo: it uses the key-agreement protocol to encrypt channel messages
  postEncrypted(channelName, plainMessage, msgAttributes) {
  }
  //!!! todo: it delegates message-posting to connection manager.
  //     see also todo zw3w737
  //!!! todo zfnsmq8: it refuses to post plain-text messages into encrypted channels
  //     see also todo y0w9cvr
  findSubscription(channelName, required = true) {
    const { subscriptions } = this;
    const { subs } = subscriptions;
    if (!subs) {
      throw new Error(`no subscriptions found`);
    }
    let sub = subs[channelName];
    if (subscriptions.type === "mass") {
      if (!sub) {
        this.debug(`using massHandler for channel ${channelName}`);
        sub = subscriptions.massHandler;
      } else {
        this.debug(`using special admin handler for channel ${channelName}`);
      }
    } else if (sub) {
      this.debug(`using regular mapped handler for channel ${channelName}`);
    } else if (!required) {
      return void 0;
    } else {
      throw new Error(`no subscription found for channel ${channelName}`);
    }
    return sub;
  }
  async postMessage(channelName, oMsg) {
    const sub = this.findSubscription(channelName, false);
    const message = { ...oMsg };
    this.logger.info("posting message ", message);
    let { type, ocid, msg } = message;
    if (!(type && msg)) {
      throw new Error(`missing required 'type' and/or 'message'`);
    }
    if ("string" !== typeof msg) {
      throw new Error(`message 'msg' attr must be a string, not a JSON object`);
    }
    if (!message.ocid) {
      const _ocid = nanoid();
      ocid = message.ocid = _ocid;
    }
    if (sub) {
      sub.recentMsgs.add(ocid);
    }
    const result = await this.fetch(`/channel/${channelName}/message`, {
      method: "POST",
      body: JSON.stringify(message),
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        clientid: this.clientid
      }
    });
    if (sub) {
      sub.recentMsgs.delete(ocid);
      sub.recentMsgs.add(result.id);
    }
    result.ocid = ocid;
    return result;
  }
  //! disconnects from neighborhood
  disconnect() {
    this.connManager.disconnect();
  }
}
__decorateClass([
  autobind
], DredClient.prototype, "emitState");
__decorateClass([
  autobind
], DredClient.prototype, "processChannelsMsg");
__decorateClass([
  autobind
], DredClient.prototype, "processAuthMsg");

var __defProp$5 = Object.defineProperty;
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$5 = (obj, key, value) => __defNormalProp$5(obj, typeof key !== "symbol" ? key + "" : key, value);
class RedisSet {
  constructor(redis, key = "_abstract") {
    __publicField$5(this, "redis");
    __publicField$5(this, "key");
    __publicField$5(this, "abstract");
    __publicField$5(this, "disconnected", false);
    this.redis = redis.duplicate();
    this.key = key;
    this.abstract = !!(key === "_abstract");
  }
  async has(key, setName) {
    this.assertOk(setName);
    return this.redis.call("SISMEMBER", setName || this.key, key);
  }
  async add(key, setName) {
    this.assertOk(setName);
    if (this.abstract && !setName)
      throw new Error(`abstract RedisSet requires setName in arg2`);
    return this.redis.call("SADD", setName || this.key, key);
  }
  async delete(key, setName) {
    this.assertOk(setName);
    if (this.abstract && !setName)
      throw new Error(`abstract RedisSet requires setName in arg2`);
    return this.redis.call("SREM", setName || this.key, key);
  }
  assertOk(setName) {
    if (this.disconnected)
      throw new Error(`RedisSet ${this.key} is disconnected`);
    if (this.abstract && !this.key && !setName)
      throw new Error(`abstract RedisSet requires key in last arg`);
  }
  async cleanup() {
    this.disconnected = true;
    this.redis.removeAllListeners();
    return this.redis.disconnect();
  }
}

var __defProp$4 = Object.defineProperty;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$4 = (obj, key, value) => __defNormalProp$4(obj, typeof key !== "symbol" ? key + "" : key, value);
const StringValueAdapter = {
  toRedis(v) {
    return v;
  },
  fromRedis(v) {
    return v;
  }
};
const JSONValueAdapter = {
  toRedis(v) {
    return JSON.stringify(v);
  },
  fromRedis(v) {
    return JSON.parse(v);
  }
};
class RedisHash {
  constructor(redis, hashName, adapter) {
    __publicField$4(this, "redis");
    __publicField$4(this, "hashName");
    __publicField$4(this, "abstract");
    __publicField$4(this, "adapter");
    __publicField$4(this, "disconnected", false);
    this.redis = redis.duplicate();
    this.hashName = hashName;
    this.adapter = adapter;
    this.abstract = !!(hashName === "_abstract");
  }
  async get(key, hashName) {
    this.assertOk();
    const hName = hashName || this.hashName;
    const str = await this.redis.call(
      "HGET",
      hName,
      key.toString()
    );
    const parsed = this.adapter.fromRedis(str);
    return parsed;
  }
  async has(key, hashName) {
    this.assertOk();
    const hName = hashName || this.hashName;
    const v = await this.redis.hexists(hName, key.toString());
    return !!v;
  }
  async keys(hashName) {
    this.assertOk(hashName);
    const hName = hashName || this.hashName;
    return this.redis.call("HKEYS", hName);
  }
  async size(hashName) {
    this.assertOk(hashName);
    const hName = hashName || this.hashName;
    return this.redis.hlen(hName);
  }
  async set(key, value, hashName) {
    this.assertOk(hashName);
    const hName = hashName || this.hashName;
    const v = this.adapter.toRedis(value);
    return this.redis.call("HSET", hName, key.toString(), v);
  }
  async delete(key, hashName) {
    this.assertOk(hashName);
    const hName = hashName || this.hashName;
    return this.redis.call("HDEL", hName, key.toString());
  }
  assertOk(hashName) {
    if (this.disconnected) {
      debugger;
      throw new Error(`RedisHash ${this.hashName} is disconnected`);
    }
    if (this.abstract && !this.hashName && !hashName)
      throw new Error(`abstract RedisHash requires hashName in last arg`);
  }
  async cleanup() {
    this.disconnected = true;
    this.redis.removeAllListeners();
    return this.redis.disconnect();
  }
}

var __defProp$3 = Object.defineProperty;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$3 = (obj, key, value) => __defNormalProp$3(obj, key + "" , value);
const { encodeUTF8, decodeUTF8, encodeBase64, decodeBase64 } = util;
const localNbh = "localhost-nbh";
class StaticHostDiscovery extends Discovery {
  constructor(options) {
    const { neighborhood, hosts } = options;
    super({ neighborhood: localNbh });
    __publicField$3(this, "hosts");
    this.hosts = hosts || StaticHostDiscovery.defaultHosts();
  }
  async getNeighborhoods() {
    await asyncDelay$1(1);
    return [localNbh, this.nbh].filter(Boolean);
  }
  /**
   * overrides the base class to prevent triggering unneeded re-discovery of static hosts
   */
  setNeighborhood(nbh) {
    this.nbh = nbh;
    return this;
  }
  // getPubKeyFromFs(port:number): string { //Uint8Array
  //     const pubKeyFile = `config/keys/server.port-${port}.pub`;
  //     const privateKeyFile = `config/keys/server.port-${port}.sec`;
  //     try {
  //         const pubKey = readFileSync(pubKeyFile);
  //         const key64 = pubKey.toString().trim();
  //         console.log(`server ${port} pubkey:`, key64);
  //         return key64;
  //         // return decodeBase64(key64)
  //     } catch (e) {
  //         console.error(`No pubkey found for server  in`, pubKeyFile);
  //         StringNacl.newKeyPair().then(key => {
  //             console.log("\nTo create a new key for this local dev server:\n",
  //                 `add '${encodeBase64(key.publicKey)}' to ${pubKeyFile}\n`,
  //                 `add '${encodeBase64(key.secretKey)}' to ${privateKeyFile}\n`,
  //             );
  //             throw new Error(`missing required local key configuration for local dev server`)
  //         })
  //         return "no pubkey"
  //     }
  // }
  static defaultHosts() {
    const host = process.env.DRED_HOST || "127.0.0.1";
    const port = parseInt(process.env.DRED_PORT || "3029");
    return [{
      serverId: "singleton",
      address: host,
      port,
      insecure: true
      // publicKey: this.getPubKeyFromFs(3029),
    }];
  }
  setupDefaultHosts() {
    return this.reset(this.constructor.defaultHosts());
  }
  async initHostDiscovery() {
    if (!this.hosts || this.hosts.length === 0) {
      this.setupDefaultHosts();
    }
  }
  toJSON() {
    return { localDevHosts: this.hosts };
  }
  async getHostList() {
    if (!this.hosts)
      throw new Error(`call setupDefaultHosts() or provide hosts in constructor`);
    await asyncDelay$1(1);
    return this.hosts;
  }
  async getConnectionThresholds() {
    if (!this.hosts) {
      throw new Error(`no this.hosts`);
    }
    if (this.hosts.length > 2) {
      return { minimal: 2, healthy: 3 };
    }
    if (this.hosts.length > 1) {
      return { minimal: 1, healthy: 2 };
    }
    return { minimal: 1, healthy: 1 };
  }
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
class ReplicationSourceBookmarks {
  constructor(localServerId, remoteServerId, connection) {
    __publicField$2(this, "redis");
    __publicField$2(this, "localServerId");
    __publicField$2(this, "remoteServerId");
    __publicField$2(this, "channelBookmarks");
    this.redis = connection;
    this.localServerId = localServerId;
    this.remoteServerId = remoteServerId;
    this.channelBookmarks = new RedisHash(
      this.redis,
      `bookmarks:repl<${this.localServerId}>-at-${this.remoteServerId}-#`,
      StringValueAdapter
    );
  }
  async getBookmark(channel) {
    const result = await this.channelBookmarks.get(channel);
    if (!result) {
      return "0";
    }
    return result;
  }
  async setBookmark(channel, bookmark) {
    return this.channelBookmarks.set(channel, bookmark).then(() => {
    });
  }
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
const {
  blue,
  yellow} = colors;
class DredReplicator {
  constructor(homeServer, discovery) {
    __publicField$1(this, "logger");
    __publicField$1(this, "homeServer");
    __publicField$1(this, "discovery");
    __publicField$1(this, "replicants", []);
    __publicField$1(this, "initialized", false);
    __publicField$1(this, "replicantsReady");
    const serverDb = homeServer.redisDb;
    const dbInfo = serverDb ? `/#${serverDb}` : "";
    const name = `${nanoid(4)}${dbInfo}`;
    this.logger = zonedLogger("replicator", {
      color: yellow.start,
      //  levels: {default: "info"},
      loggerId: name
    });
    this.homeServer = homeServer;
    this.discovery = discovery;
  }
  isInitialized() {
    return this.initialized;
  }
  /**
   * Get replicants that are successfully connected/active
   */
  getActiveReplicants() {
    return this.replicants.filter((replicant) => replicant.isActive());
  }
  log(message, ...args) {
    this.logger.info(message, ...args);
  }
  warn(message, ...args) {
    this.logger.warn(message, ...args);
  }
  progress(message, ...args) {
    this.logger.progress(message, ...args);
  }
  debug(message, ...args) {
    this.logger.debug(message, ...args);
  }
  async initialize() {
    if (this.initialized) {
      this.progress(`already initialized`);
      return;
    }
    this.initialized = true;
    this.debug(`initializing`);
    const hosts = await this.discovery.getHostList();
    const otherHosts = hosts.filter((host) => host.serverId !== this.homeServer.serverId);
    const readySignals = [];
    for (const host of otherHosts) {
      const replicant = new Replicant(this, this.homeServer, host);
      this.replicants.push(replicant);
      readySignals.push(
        new Promise((resolve) => {
          replicant.eventEmitter.once("replicator:connected", resolve);
        })
      );
      try {
        replicant.startConnectionLoop();
      } catch (error) {
        this.logger.error(`starting connection loop:`, error.stack);
      }
    }
    this.replicantsReady = Promise.all(readySignals);
    this.progress(`initialized with ${this.replicants.length} replicants`);
  }
  async cleanup() {
    if (!this.initialized) {
      this.warn(`not initialized`);
      return;
    }
    this.debug(`cleanup ${this.replicants.length} replicants`);
    const results = await Promise.allSettled(
      this.replicants.map((replicant, index) => {
        return replicant.cleanup();
      })
    );
    results.forEach((result, index) => {
      if (result.status === "rejected") {
        this.warn(`Error cleaning up replicant ${index}: ${result.reason}`);
      }
    });
    this.replicants = [];
    this.initialized = false;
    this.progress(`cleanup complete`);
  }
  // // true when message with this ocid was already processed for this channel
  // public hasProcessedMessage(channelId: string, messageId: string): boolean {
  //     const channelMessages = this.mapChOcid.get(channelId);
  //     return channelMessages ? channelMessages.has(messageId) : false;
  // }
  // // mark message with this ocid as processed for this channel
  // public markMessageAsProcessed(channelId: string, messageId: string): void {
  //     if (!this.mapChOcid.has(channelId)) {
  //         this.mapChOcid.set(channelId, new Set<string>());
  //     }
  //     this.mapChOcid.get(channelId)!.add(messageId);
  // }
}
class Replicant {
  constructor(replicator, homeServer, targetHost) {
    __publicField$1(this, "replicator");
    __publicField$1(this, "homeServer");
    __publicField$1(this, "targetHost");
    __publicField$1(this, "name");
    __publicField$1(this, "repClient");
    __publicField$1(this, "retryState");
    __publicField$1(this, "logger");
    __publicField$1(this, "eventEmitter", new EventEmitter());
    this.replicator = replicator;
    this.homeServer = homeServer;
    this.targetHost = targetHost;
    const serverDb = homeServer.redisDb;
    const dbInfo = serverDb ? `${nanoid(3)}/#${serverDb}-` : "";
    const target = targetHost.serverId.replace(/^dredNode-/, "") || targetHost.address;
    this.name = `${dbInfo}from-${target}`;
    this.logger = zonedLogger("replicant", {
      loggerId: this.name,
      color: blue.start
    });
    this.repClient = null;
    this.retryState = {
      isRetrying: false
    };
  }
  log(message, ...args) {
    this.logger.info(message, ...args);
  }
  warn(message, ...args) {
    this.logger.warn(message, ...args);
  }
  progress(message, ...args) {
    this.logger.progress(message, ...args);
  }
  debug(message, ...args) {
    this.logger.debug(message, ...args);
  }
  trace(message, ...args) {
    this.logger.trace(message, ...args);
  }
  /**
   * Get the target host details
   */
  getTargetHost() {
    return this.targetHost;
  }
  /**
   * Check if this replicant is active (has a connected client)
   */
  isActive() {
    if (!this.repClient) {
      return false;
    }
    try {
      const connManager = this.repClient.connManager;
      if (!connManager) {
        return false;
      }
      return this.hasActiveConnections(connManager);
    } catch (error) {
      return false;
    }
  }
  /**
   * Check if the connection manager has any active connections
   */
  hasActiveConnections(connManager) {
    try {
      if (this.repClient) {
        const clientConnManager = this.repClient.connManager;
        if (clientConnManager) {
          const clientConnStatus = clientConnManager.connStatus;
          if (clientConnStatus && clientConnStatus.size > 0) {
            for (const [conn, status] of clientConnStatus.entries()) {
              const graveyard = clientConnManager.graveyard;
              if (graveyard && graveyard.has(conn)) {
                continue;
              }
              if (status === "active") {
                return true;
              }
            }
          }
        }
        if (!this.retryState.isRetrying) {
          return true;
        }
      }
      return false;
    } catch (error) {
      return false;
    }
  }
  /**
   * Start the connection loop with retry logic (non-blocking)
   */
  startConnectionLoop() {
    this.logger.progress(`starting connection loop`);
    if (this.repClient !== null) {
      this.warn(`${this.name} already has a client, cleaning up first`);
      this.cleanup().then(() => {
        this.attemptConnection();
      }).catch((error) => {
        this.warn(
          `${this.name} cleanup failed, proceeding with connection attempt: ${error}`
        );
        this.attemptConnection();
      });
    } else {
      this.attemptConnection();
    }
  }
  /**
   * Attempt to establish connection and set up replication (async, non-blocking)
   */
  async attemptConnection() {
    try {
      this.retryState.lastAttemptTime = /* @__PURE__ */ new Date();
      const isAvailable = await this.checkServerAvailability();
      if (!isAvailable) {
        throw new Error(`Target server ${this.targetHost.serverId} is not available`);
      }
      const focusedDiscovery = new StaticHostDiscovery({
        hosts: [this.targetHost],
        neighborhood: this.homeServer.nbh
      });
      this.repClient = new DredClient({
        ...this.homeServer.clientArgs,
        name: this.name,
        neighborhood: this.homeServer.nbh,
        discovery: focusedDiscovery,
        bookmarkStorage: new ReplicationSourceBookmarks(
          this.homeServer.serverId,
          this.targetHost.serverId,
          this.homeServer.redis
        )
      });
      if (this.repClient) {
        const connManager = this.repClient.connManager;
        if (connManager && connManager.setMaxListeners) {
          connManager.setMaxListeners(20);
        }
        if (this.repClient.setMaxListeners) {
          this.repClient.setMaxListeners(20);
        }
      }
      let success = false;
      const connectionPromise = this.performConnection().then(() => {
        success = true;
      });
      asyncDelay(1e3).then(() => {
        if (!success) {
          this.warn("Replicator trying to connect ...");
        }
      });
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("DRED client connection timeout after 10 seconds"));
        }, 1e4);
      });
      await Promise.race([connectionPromise, timeoutPromise]);
      if (!success) {
        throw new Error("unreachable error");
      } else {
        this.resetRetryState();
        this.eventEmitter.emit("replicator:connected", this);
        this.log(`replicating`);
      }
    } catch (error) {
      if (this.repClient) {
        try {
          this.repClient.disconnect();
        } catch (cleanupError) {
        }
        this.repClient = null;
      }
      this.scheduleRetry();
    }
  }
  /**
   * Check if the target server is available with a simple HTTP GET /channels
   */
  async checkServerAvailability() {
    try {
      let secureProtocol = "https";
      if (this.targetHost.insecure) {
        if (process.env.NODE_ENV !== "test") {
          throw new Error("insecure replication is only allowed in test environment");
        }
        secureProtocol = "http";
      }
      const url = `${secureProtocol}://${this.targetHost.address}:${this.targetHost.port}/channels`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5e3);
      const response = await fetch$1(url, {
        method: "GET",
        signal: controller.signal,
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          clientId: `${this.name}-REPL`
        }
      });
      clearTimeout(timeoutId);
      if (response.ok) {
        return true;
      } else {
        this.warn(`HTTP error: ${response.status}: ${response.statusText}`);
        this.warn(
          `can't yet replicate from ${this.targetHost.address}:${this.targetHost.port} - will retry`
        );
        return false;
      }
    } catch (error) {
      this.warn(error.cause.message || error.message);
      this.warn(
        `can't yet replicate from ${this.targetHost.address}:${this.targetHost.port} - will retry`
      );
      return false;
    }
  }
  /**
   * Perform the actual connection setup (called with timeout)
   */
  async performConnection() {
    if (!this.repClient) {
      throw new Error("Client not initialized");
    }
    await this.repClient.generateKey();
    const commonChannels = await this.findCommonChannels();
    await this.subscribeToCommonChannels(commonChannels);
  }
  /**
   * Schedule a retry attempt after the configured interval
   */
  scheduleRetry() {
    if (this.retryState.isRetrying) {
      return;
    }
    const retryIntervalSeconds = parseInt(
      process.env.REPLICATION_RETRY_INTERVAL_SECONDS || "60",
      10
    );
    const retryIntervalMs = retryIntervalSeconds * (process.env.NODE_ENV === "test" ? 100 : 1e3);
    this.retryState.isRetrying = true;
    this.retryState.nextRetryTime = new Date(Date.now() + retryIntervalMs);
    this.retryState.retryTimer = setTimeout(() => {
      this.attemptConnection();
    }, retryIntervalMs);
  }
  /**
   * Reset retry state after successful connection
   */
  resetRetryState() {
    if (this.retryState.retryTimer) {
      clearTimeout(this.retryState.retryTimer);
      this.retryState.retryTimer = void 0;
    }
    this.retryState.isRetrying = false;
    this.retryState.nextRetryTime = void 0;
  }
  async findCommonChannels() {
    if (!this.repClient.channels || this.repClient.channels.length === 0) {
      this.debug(`finding remote channels`);
      this.repClient.channels = await this.repClient.connManager.getChannelList();
    }
    const targetChannels = this.repClient.channels;
    this.trace(`found channels: ${targetChannels.join(", ")}`);
    const homeChannels = await this.homeServer.channelList.keys();
    this.trace(`my channels: ${homeChannels.join(", ")}`);
    const commonChannels = targetChannels.filter(
      (channel) => homeChannels.includes(channel) && !channel.startsWith("_")
      // Skip meta channels for now
    );
    this.trace(`common channels: ${commonChannels.join(", ")}`);
    this.progress(`${commonChannels.length} common channels`);
    return commonChannels;
  }
  async subscribeToCommonChannels(channels) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    this.logger.ops(`Connection states:
          - RepClient: ${this.repClient.currentState}
          - ConnManager: ${this.repClient.connManager.currentState}
          - Waiting for connection...
          - After wait - RepClient: ${this.repClient.currentState}, ConnManager: ${this.repClient.connManager.currentState}`);
    await this.repClient.subscribeToChannels({
      type: "mass",
      channels,
      massHandler: this.messageHandler.bind(this)
    });
    this.progress(`subscribed to ${channels.length} channels`);
  }
  /**
   * Handle incoming message from target server to this client attached to the home server
   * @param channelId
   * @param message
   * @returns
   */
  async messageHandler(inboundMessage) {
    const { mid, channel, ocid } = inboundMessage;
    try {
      this.trace(`received message`, { channel, mid });
      const messageId = ocid || mid || `${Date.now()}-${Math.random()}`;
      if (!ocid) {
        this.debug(`Skipping message without ocid`, messageId);
        return;
      }
      if (inboundMessage.origSrvId === this.homeServer.serverId) {
        this.debug(`Skipping message originating from here: %s`, messageId);
        return;
      }
      if (inboundMessage.replFrom && inboundMessage.replFrom !== void 0) {
        this.warn(
          `---- UNEXPECTED: Skipping message: already replicated (from ${inboundMessage.replFrom})`
        );
        this.warn(
          `TODO: !!! ensure a ring topology doesn't drop messages due to this policy`
        );
        return;
      }
      if (!await this.weHaveChannel(channel, messageId)) {
        this.warn("dropping message for non-existent channel: %o", { channel, messageId });
        this.warn(
          `TODO: !!! check for a race involving a new channel; ensure we aren't dropping messages`
        );
        return;
      }
      const {
        msg,
        type,
        "content-type": contentType,
        encryptedMsg
      } = inboundMessage;
      const replicatedMessage = {
        // type: message.type || "replicated",'
        msg,
        type,
        "content-type": contentType,
        ocid,
        encryptedMsg,
        replFrom: this.targetHost.serverId,
        replAt: (/* @__PURE__ */ new Date()).getTime(),
        origMsgId: messageId,
        origSrvId: this.targetHost.serverId
      };
      await this.addMessage(channel, mid, replicatedMessage);
    } catch (error) {
      this.logger.error(`while replicating channel '${channel}': `, error.stack);
      throw error;
    }
  }
  /**
   * Check if the message should be replicated to the home server
   *
   *
   * @param channelId
   * @param messageId
   * @returns
   */
  async weHaveChannel(channelId, messageId) {
    const channelExists = await this.homeServer.channelList.has(channelId);
    if (!channelExists) {
      this.debug(
        `Channel ${channelId} no longer exists on home server, skipping replication`
      );
      return false;
    }
    return true;
  }
  async addMessage(channelId, mid, messageDetails) {
    try {
      const { ocid } = messageDetails;
      const result = await this.homeServer.ensureMessageProcessedOnce(
        channelId,
        ocid,
        messageDetails.msg,
        messageDetails
      );
      if (result) {
        this.logger.trace(`Message added to local server: ${result}`);
      } else {
        this.debug(`already replicated: ${channelId}/ ${messageDetails.ocid}`);
      }
      this.repClient?.bookmarkStorage.setBookmark(channelId, mid);
    } catch (error) {
      this.logger.error(`while adding to channel ${channelId}: ${error}`);
      throw error;
    }
  }
  /**
   * Clean up replicant resources following ownership pattern.
   * TestServer owns client lifecycle, so we just nullify our reference.
   */
  async cleanup() {
    this.trace(`cleaning up replicant`);
    if (this.retryState.retryTimer) {
      clearTimeout(this.retryState.retryTimer);
      this.retryState.retryTimer = void 0;
      this.debug(`cleared retry timer`);
    }
    this.retryState.isRetrying = false;
    this.retryState.nextRetryTime = void 0;
    if (this.repClient) {
      this.repClient.disconnect();
      this.repClient = null;
    }
    this.progress(`cleanup complete`);
  }
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const {
  bgBlack,
  bgGreenBright,
  black,
  white} = colors;
parseInt(process.env.LOGGING || "0");
const optionsSerializer = {
  toRedis(v) {
    if ("member" !== v.approveJoins && "open" !== v.approveJoins) v.approveJoins = "owner";
    return JSONValueAdapter.toRedis(v);
  },
  fromRedis(v) {
    const g = JSONValueAdapter.fromRedis(v);
    const opts = { ...g };
    opts.createdAt = new Date(g.createdAt);
    g.expiresAt && (opts.expiresAt = new Date(g.expiresAt));
    return opts;
  }
};
class DredServer {
  constructor(args, serverId, redisDb) {
    __publicField(this, "api");
    __publicField(this, "discovery");
    __publicField(this, "redisUrl");
    __publicField(this, "redisDb");
    __publicField(this, "redis");
    __publicField(this, "channelConn");
    __publicField(this, "listener");
    // http.Server from node types
    __publicField(this, "args");
    __publicField(this, "channelList");
    __publicField(this, "channelOptions");
    __publicField(this, "producers");
    __publicField(this, "subscribers");
    __publicField(this, "clientArgs");
    __publicField(this, "verifier");
    __publicField(this, "serverId");
    __publicField(this, "myServerInfo");
    __publicField(this, "logger");
    // Optional replicator, to be initialized only when replication is enabled
    __publicField(this, "replicator");
    // Periodic status logging
    __publicField(this, "statusLoggingTimer");
    __publicField(this, "resetting", false);
    __publicField(this, "setupPending");
    __publicField(this, "didMakeDefaultChannels", false);
    __publicField(this, "_knownMessages");
    __publicField(this, "resultLogger", (req, res, next) => {
      const now = (/* @__PURE__ */ new Date()).getTime();
      const elapsed = now - res.locals.startTime;
      this.reqLogger(res).info(
        `<- ${res.statusCode} ${req.method} ${req.originalUrl || req.url} ${elapsed}ms`
      );
    });
    __publicField(this, "getChannels", async (req, res, next) => {
      const found = await this.channelList.keys();
      const channels = found.filter((x) => x[0] !== "_");
      res.status(200).json({ channels });
      next();
    });
    __publicField(this, "createChannel", async (req, res, next) => {
      const { channelId } = req.params;
      const options = req.body;
      const found = await this.channelList.has(channelId);
      if (found) {
        this.warn(`Channel creation failed: ${channelId} already exists`);
        res.status(400).json({ error: "channel already exists" });
        return next();
      }
      let {
        channelId: invalidChanId,
        encrypted,
        owner,
        members = [],
        requests = [],
        allowJoining,
        approveJoins,
        memberLimit,
        expiresAt,
        messageLifetime,
        signature
      } = options;
      if (invalidChanId) {
        res.status(422).json({
          error: "body.channelId is invalid; use params.channelId instead."
        });
        return next();
      }
      expiresAt = expiresAt ? new Date(expiresAt) : void 0;
      const now = /* @__PURE__ */ new Date();
      if (expiresAt && now > expiresAt) {
        res.status(422).json({
          error: "channel expiresAt is already in the past"
        });
        return next();
      }
      if (encrypted) {
        if (!owner) {
          res.status(400).json({
            error: "missing required 'owner' setting for an encrypted channel"
          });
          return next();
        }
        if (!signature) {
          res.status(400).json({
            error: "missing signature; use the result of sign(channelName)"
          });
          return next();
        }
        const verified = await this.verifier.verifySig(channelId, signature, owner);
        if (!verified) {
          res.status(400).json({
            error: "bad signature; use the result of sign(channelName)"
          });
          return next();
        }
      }
      //! it doesn't allow any extraneous JSON keys to leak through the options during channel-creation
      const opts = {
        channelId,
        encrypted,
        owner,
        members,
        requests,
        allowJoining,
        approveJoins,
        memberLimit,
        expiresAt,
        messageLifetime,
        signature,
        createdAt: /* @__PURE__ */ new Date()
      };
      await this.setChanOptions(channelId, opts);
      await this.channelList.set(channelId, "1");
      await this.channelCreated(channelId, opts);
      res.json({
        id: channelId,
        status: "created",
        ...opts
      });
      next();
    });
    __publicField(this, "joinInChannel", async (req, res, next) => {
      const { channelId } = req.params;
      const { myId, member, signature } = req.body;
      const found = await this.channelList.has(channelId);
      const now = /* @__PURE__ */ new Date();
      if (!found) {
        this.warn(`Join failed: Channel ${channelId} not found`);
        res.status(400).json({ error: "invalid channel" });
        return next();
      }
      //! the channel must be encrypted (non-encrypted channels are open by definition)
      const opts = await this.getChanOptions(channelId);
      //! trying to join an expired channel produces an error
      if (opts.expiresAt && now > opts.expiresAt) {
        this.warn(
          `Join failed: Channel ${channelId} is expired
expiration '${opts.expiresAt.getTime() % 1e5}, now '${now.getTime() % 1e5}`
        );
        res.status(422).json({
          error: "this channel's expiresAt is already past"
        });
        return next();
      }
      if (!opts.encrypted) {
        res.status(400).json({
          error: "/channel/:id/join is not needed for non-encrypted channels"
        });
        return next();
      }
      if (!signature) {
        res.status(400).json({
          error: "missing required 'signature' field in body"
        });
        return next();
      }
      opts.members = opts.members || [];
      opts.requests = opts.requests || [];
      //! non-owners cannot exceed the memberLimit (if configured)
      let overMemberLimit = opts.memberLimit && opts.members.length >= opts.memberLimit;
      let requestOnly = false;
      let approvedVerifier;
      if (opts.owner == myId) {
        //! the owner can join someone by pubKey, even if the memberLimit is reached
        overMemberLimit = false;
        approvedVerifier = myId;
        this.info("owner-approved join");
      } else if ("member" == opts.approveJoins && (opts.members || []).includes(myId)) {
        //! a member can join someone by pubKey if approveJoins: member
        this.info("member-approved join");
        approvedVerifier = myId;
      } else if (opts.allowJoining) {
        //! a non-member can join themself if allowJoining is true and approveJoins is "open"
        if (member !== myId) {
          res.status(400).json({
            error: "can't invite others"
          });
          return next();
        }
        //! non-member joins are requests unless approveJoins = "open"
        if ("open" !== opts.approveJoins) {
          requestOnly = true;
          opts.requests.push(myId);
          approvedVerifier = myId;
          //!!! todo: join requests, when not open, are simple messages in the channel,
          //!    which clients can read, prompting members or owner to issue an approval.
        } else {
          this.info("self-join");
          approvedVerifier = myId;
        }
      }
      if (!approvedVerifier && !requestOnly) {
        this.warn("unauthorized");
        res.status(403).json({
          error: "unauthorized"
        });
        return next();
      }
      if (opts.members.includes(member)) overMemberLimit = false;
      if (overMemberLimit) {
        this.warn(`Join failed: Channel ${channelId} is full`);
        res.status(403).json({
          error: "channel is full"
        });
        return next();
      }
      let verified, error;
      try {
        verified = await this.verifier.verifySig(member, signature, approvedVerifier);
        if (!verified) error = "verify failed";
      } catch (e) {
        error = e.message;
      }
      if (!verified) {
        this.warn(`Join failed: Signature verification failed - ${error}`);
        res.status(400).json({
          error: `bad signature: ${error}`
        });
        return next();
      }
      if (requestOnly) {
        opts.requests.push(myId);
      } else {
        opts.members.push(member);
      }
      await this.setChanOptions(channelId, opts);
      //! if allowed, it returns a success indicator
      res.json({
        status: "joined"
      });
      next();
    });
    __publicField(this, "postMessageInChannel", async (req, res, next) => {
      const { channelId } = req.params;
      const found = await this.channelList.has(channelId);
      if (!found) {
        res.status(404).json({
          error: "channel not found"
        });
        return next();
      }
      const message = req.body;
      //! it extracts and SILENTLY ignores reserved keys _type, _data in client-provided event details.
      const { msg, _type, _data, ...moreDetails } = message;
      let ocid = moreDetails.ocid;
      if (!ocid) {
        ocid = nanoid(6);
        this.trace("generated missing ocid %s for message %o", ocid, message);
        moreDetails.ocid = ocid;
      }
      this.debug("postMessageInChannel", channelId, ocid);
      this.trace("msg %s: %o", ocid, message);
      //!!! todo y0w9cvr: it refuses to post plain-text messages into encrypted channels
      if ("string" !== typeof msg) {
        res.status(422).json({
          error: "message must be a string, not a JSON object"
        });
        return next();
      }
      if (!msg) {
        res.status(422).json({
          error: "missing required 'msg' attribute for posting message in channel"
        });
      } else if (!moreDetails.ocid) {
        res.status(422).json({
          error: "missing required 'ocid' attribute for posting message in channel"
        });
      } else if (!moreDetails.type) {
        res.status(422).json({
          error: "missing required 'type' attribute for posting message in channel"
        });
      } else {
        const id = await this.ensureMessageProcessedOnce(
          channelId,
          moreDetails.ocid,
          msg,
          moreDetails
        );
        if (id) {
          res.json({ id, status: "created", ocid: moreDetails.ocid });
        } else {
          res.status(409).json({ error: "duplicate message", ocid: moreDetails.ocid });
        }
      }
      next();
    });
    __publicField(this, "listenOnChannels", async (req, res, next) => {
      let cancelled = false;
      const subscriptions = req.body;
      res.contentType("application/ndjson");
      res.useChunkedEncodingByDefault = false;
      const reqLogger = this.reqLogger(res);
      reqLogger.progress("listening: %d channels: %s", subscriptions.length, subscriptions.map((s) => `${s.channel}^${s.options.bookmark}`).join(", "));
      //!!! todo: it validates authorization as appropriate for each requested channel
      let pendingFlush;
      const sendUpdate = (maxLatency, ...messages) => {
        for (const json of messages) {
          const update = JSON.stringify(json);
          res.write(update + "\n");
          reqLogger.trace("    <- ", update);
        }
        if (!maxLatency) {
          res.flush();
        } else if (maxLatency > 0 && !pendingFlush) {
          pendingFlush = setTimeout(() => {
            res.flush();
            pendingFlush = void 0;
          }, maxLatency);
        }
      };
      const myStreamListeners = [];
      const timerInterval = 7e3;
      //! it sends heartbeat signals every so often to clients
      //!!! todo: heartbeat interval can be configured
      const timer = setInterval(() => {
        reqLogger.trace("   <- heartbeat");
        sendUpdate(0, { type: "heartbeat" });
      }, timerInterval);
      timer.unref();
      //! the heartbeat-timer never blocks the process from exiting when it's otherwise done
      const cleanup = () => {
        reqLogger.debug("cleanup");
        //! it cleans up all the internal subscriptions
        for (const mySub of myStreamListeners) {
          const { channel, stream } = mySub;
          this.channelConn.unsubscribe(stream);
        }
        clearInterval(timer);
      };
      res.on("close", cleanup);
      const cancel = () => {
        cancelled = true;
        res.end();
        cleanup();
        next();
      };
      const notifyConsumeError = (res2, channel, consumeError) => {
        if (!cancelled) {
          sendUpdate(0, {
            channel,
            type: "error",
            message: "internal stream consumer failed",
            reason: consumeError.message
          });
          this.reqLogger(res2).error(
            `${channel} consume error; TODO: reconnect/retry`,
            consumeError.stack || consumeError.message || consumeError
          );
          cleanup();
          next();
        }
      };
      let anySuccesses = 0;
      let warnings = [];
      for (const sub of subscriptions) {
        const { channel, options: {
          maxLatency = defaultMaxDelayMs,
          bookmark,
          filter
        } } = sub;
        const found = await this.channelList.has(channel);
        if (!found) {
          //! sends a warning note but does not fail unless there are no valid subscriptions
          warnings.push({
            //!!! todo: review & craft the shape of this for consistency with other warnings that may be necessary to send to clients
            channel,
            type: "warning",
            message: "invalid or expired channel"
          });
        }
        this.trace("  -- listening one: ", sub.channel);
        const subscriber = await this.listenOneChannel(
          res,
          sub,
          sendUpdate.bind(this, maxLatency),
          notifyConsumeError
        );
        myStreamListeners.push({ channel, stream: subscriber });
        if (subscriber) anySuccesses += 1;
      }
      if (!anySuccesses) {
        res.status(404).json({ error: "no valid subscriptions in request" });
        return cancel();
      } else if (warnings.length) {
        sendUpdate(0, ...warnings);
      }
      reqLogger.debug("  \u{1F477}listening in %d channels", subscriptions.length);
      reqLogger.trace(`  \u{1F477}channels: ${subscriptions.map((s) => s.channel).join(", ")}`);
      //! it tells clients how frequently they should expect a heartbeat
      sendUpdate(0, { type: "heartbeat-info", timerInterval });
    });
    __publicField(this, "adminReplicationStatus", async (req, res, next) => {
      try {
        const isActive = !!this.replicator && this.replicator.isInitialized();
        const replicatorExists = !!this.replicator;
        const discoveryHosts = this.discovery?.hosts || [];
        const myServerId = this.serverId;
        const peerCount = discoveryHosts.filter((h) => h.serverId !== myServerId).length;
        res.json({
          status: "ok",
          replication: {
            active: isActive,
            replicatorExists,
            serverId: myServerId,
            discoveredPeers: peerCount,
            discoveryType: this.discovery.constructor.name,
            hosts: discoveryHosts.map((h) => ({
              serverId: h.serverId,
              address: h.address,
              port: h.port
            }))
          }
        });
      } catch (error) {
        this.warn("Error getting replication status:", error.message);
        res.status(500).json({
          status: "error",
          message: "Failed to get replication status",
          error: error.message
        });
      }
      next();
    });
    const { replicate = true } = args;
    this.args = { ...args, replicate };
    const loggerName = `dred`;
    this.logger = zonedLogger(loggerName, {
      loggerId: serverId
      // levels: {
      //     [loggerName]: logging ? "info" : "warn",
      //     _message: `(env LOGGING=${logging})`,
      // },
    });
    this.serverId = serverId;
    this.discovery = DredClient.resolveDiscovery(args);
    this.api = this.createExpressServer();
    const redisUrl = this.redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
    this.listener = null;
    this.verifier = new StringNacl(void 0, this.logger);
    this.producers = /* @__PURE__ */ new Map();
    this.subscribers = /* @__PURE__ */ new Map();
    this.redisDb = redisDb || 0;
    this.setupRedis(redisUrl);
    this.clientArgs = args;
    this.setupExpressHandlers();
  }
  get nbh() {
    return this.args.neighborhood;
  }
  setupExpressHandlers() {
    //! allows clients to avoid compression when the content is known to not benefit from it
    this.api.use(compression({ filter(req, res) {
      if (req.headers["x-no-compression"] == "true") return false;
      return compression.filter(req, res);
    } }));
    this.api.use((req, res, next) => {
      if (res.locals?.id) throw new Error("duplicate req processing detected");
      const { clientid = `\u2039gen\u203A` } = req.headers;
      res.locals.clientid = `${clientid}-${nanoid(4)}`;
      res.locals.startTime = (/* @__PURE__ */ new Date()).getTime();
      res.locals.id = nanoid(4);
      this.reqLogger(res).info(`-> ${req.method} ${req.originalUrl} `);
      next();
    });
    //!!! todo: 61pk3h0 it applies a more explicit Access-Control-Allow-Origin policy,
    this.api.use(cors());
    this.api.use(bodyParser.json({ limit: "1mb" }));
    //! it allows handlers to be mocked
    this.api.post("/channel/:channelId", (...args) => {
      this.createChannel(...args);
    });
    this.api.post("/channel/:channelId/join", (...args) => {
      this.joinInChannel(...args);
    });
    this.api.post("/channel/:channelId/message", (...args) => {
      this.postMessageInChannel(...args);
    });
    this.api.get("/channels", (...args) => {
      this.getChannels(...args);
    });
    this.api.get("/channels/subscribe", (...args) => {
      //! it allows clients to subscribe to many channels and receive notification about updates in any of them
    });
    this.api.options("/channels/listen", (...args) => {
      //! it approves any allowed CORS / cross-origin requests.  These can be limited by domain name
    });
    this.api.post("/channels/listen", (...args) => {
      //! it allows clients to subscribe to many channels and receive notification about updates in any of them
      this.listenOnChannels(...args);
    });
    this.api.get("/admin/replication-status", (...args) => {
      this.adminReplicationStatus(...args);
    });
    this.api.use(this.resultLogger);
  }
  setupRedis(url) {
    if (this.redis) throw new Error(`redis connection is already set up`);
    this.progress(`Setting up Redis connection: ${url || "default"}, db: ${this.redisDb}`);
    const options = {
      db: this.redisDb
      // keyPrefix: `${this.nbh}::`  //!!! todo vet this technique.
    };
    if (url) {
      this.redis = new Redis$1(url, options);
    } else {
      this.redis = new Redis$1(options);
    }
    this.channelList = new RedisHash(
      this.redis,
      "channels",
      StringValueAdapter
    );
    this.channelOptions = new RedisHash(this.redis, "channelOptions", optionsSerializer);
    const log = zonedLogger("dred-stream", {
      loggerId: this.serverId,
      color: bgBlack.start + white.start
    });
    this.channelConn = new RedisChannels({
      application: `${this.nbh}::`,
      redis: {
        url,
        db: this.redisDb
      },
      channels: { log }
    });
    this.progress("connected to redis");
    this.ensureDefaultChannels();
  }
  //! it has a mockable function for starting the express server
  createExpressServer() {
    return this.args.api || express();
  }
  async pendingSetup() {
    await this.ensureDefaultChannels();
    return this.setupPending;
  }
  ensureDefaultChannels() {
    if (this.setupPending) return this.setupPending;
    if (this.didMakeDefaultChannels) {
      throw new Error("default channels already made");
    }
    this.logger.debug("setting up default channels");
    return this.setupPending = new Promise(async (res) => {
      await this.doChannelSetup("_chans");
      await this.doChannelSetup("_auth");
      await this.doChannelSetup("news");
      await this.doChannelSetup("discussion");
      this.didMakeDefaultChannels = true;
      this.setupPending = void 0;
      this.logger.progress("created default channels");
      res(true);
    });
  }
  async doChannelSetup(channel, options = {}) {
    const chan = await this.channelList.has(channel);
    if (!chan) {
      await this.channelList.set(channel, "1");
    }
    const streams = this.channelConn;
    if (!streams) {
      if (this.resetting) {
        this.warn(
          "ignoring continuing channel setup for %s while racing with a subsequent reset!"
        );
        return;
      } else {
        this.logger.error(
          "??? how can this happen?? streams undefined, can't use(%s) for producing",
          channel
        );
        throw new Error(`streams undefined, can't use(${channel}) for producing`);
      }
    }
    const stream = await streams.use(channel);
    //!!! revisit this with a more specific plan : )
    await streams.produce(stream, "first event in this channel", {
      type: "channel:genesis",
      ocid: `${channel}:genesis`
    });
    const o = { channelId: channel, ...options };
    this.channelCreated(channel, o);
  }
  //
  async listen() {
    await this.setupPending;
    const myInfo = this.myServerInfo = this.myServerInfo || await this.discovery.myServerInfo(this.serverId);
    if (!myInfo) throw new Error(`can't identify my own info`);
    const { port, address } = myInfo;
    this.listener = this.api.listen(Number(port), address);
    this.info(`listening at ${address}:${port}`);
    if (this.args.replicate) {
      this.startReplicating();
    } else if (process.env.NODE_ENV == "test") {
      this.debug(`\u26A0\uFE0F replication disabled (via REPLICATION=false)`);
    } else {
      this.warn(`\u26A0\uFE0F replication disabled (via REPLICATION=false)`);
    }
    this.startPeriodicStatusLogging();
    return this.listener;
  }
  /**
   * Known message set.
   */
  get knownMessages() {
    if (!this._knownMessages) {
      this._knownMessages = new RedisSet(
        this.redis,
        `${this.nbh}::knownMessages`
      );
    }
    return this._knownMessages;
  }
  /**
   * Ensure a message is processed only once. Use it to avoid duplicate messages.
   *
   * Always await this method to prevent race conditions and blockings.
   *
   *
   * @param channel channel name
   * @param msgId ocid
   * @param msg message content
   * @param messageDetails optional
   * @returns message id if published, undefined if duplicate
   */
  async ensureMessageProcessedOnce(channel, msgId, msg, messageDetails) {
    try {
      const deduplicationKey = this.messageKey(channel, msgId);
      const alreadyProcessed = await this.knownMessages.has(deduplicationKey);
      if (alreadyProcessed) {
        this.trace(
          `skipping duplicate message: ${deduplicationKey}`
        );
        return void 0;
      }
      await this.knownMessages.add(deduplicationKey);
      this.trace(
        `+known messages: ${deduplicationKey}`
      );
      const publishedMessageId = await this.publishMessageToChannel(
        channel,
        msg,
        messageDetails
      );
      return publishedMessageId;
    } catch (error) {
      this.warn(`Error in message deduplication for ${channel}:::${msgId}:`, error.stack);
      throw error;
    }
  }
  messageKey(channel, msgId) {
    return `${channel}/${msgId}`;
  }
  /**
   * Publish a message directly without dedup.
   * Always await this method to prevent blocking caller and ensure message is published.
   *
   * @returns id of the published message
   */
  async publishMessageToChannel(channelId, msg, messageDetails = {}) {
    try {
      const producer = await this.mkChannelProducer(channelId);
      const publishedMessageId = await this.channelConn.produce(
        producer,
        msg,
        messageDetails
      );
      this.trace(`Message published to channel ${channelId}: ${publishedMessageId}`);
      return publishedMessageId;
    } catch (error) {
      this.warn(`Failed to publish message to channel ${channelId}:`, error);
      throw error;
    }
  }
  async clearMessageDeduplicationCache(olderThanMs) {
  }
  // async ensureMessageProcessedOnce(channel: string, msgId, msg: string) {
  //     // create composite key to avoid duplicates
  //     const key = `${channel}:::${msgId}`;
  //     if (await this.knownMessages.has(key)) {
  //         return;
  //     }
  //     this.knownMessages.add(key)
  //     this.actuallyPost(channel, msg)
  // }
  // async actuallyPost(channelId: string,msg: string, messageDetails: any) {
  //     // Get channel producer for home server
  //     const producer = await this.mkChannelProducer(channelId);
  //     // Produce the replicated message on the home server
  //     const id = await this.channelConn.produce(producer, msg, messageDetails);
  //     return id;
  // }
  // ------------------------------------------------------------
  async setupReplication() {
    if (this.replicator) {
      this.info("skipping extra setupReplication()");
      return;
    }
    this.progress(`replication setup`);
    try {
      this.replicator = new DredReplicator(this, this.discovery);
      await this.replicator.initialize();
    } catch (error) {
      this.logger.error(`during replication setup: `, error.stack);
      this.replicator = void 0;
      throw error;
    }
  }
  /**
   * Start auto-replication in background immediately
   */
  startReplicating() {
    this.setupReplication().then(() => {
      this.progress(`\u2705 Replication setup ok`);
    }).catch((error) => {
      this.logger.error(`\u274C Replication setup failed (will retry): ${error.message}`);
      this.scheduleReplicationRetry();
    });
  }
  /**
   * Schedule a retry of replication setup after 1 minute
   */
  scheduleReplicationRetry() {
    setTimeout(() => {
      this.warn(`\u{1F504} Retrying replication (waited 1m)`);
      this.startReplicating();
    }, 6e4);
  }
  /**
   * Start periodic status logging based on STATUS_INTERVAL_SECONDS environment variable
   * Default: 2 seconds, Range: 1-1000 seconds, 0 or negative = disabled
   */
  startPeriodicStatusLogging() {
    const intervalSeconds = parseInt(process.env.STATUS_INTERVAL_SECONDS || "5");
    if (intervalSeconds <= 0 || intervalSeconds > 1e3) {
      this.ops(
        `\u{1F4CA} Periodic status logging disabled (STATUS_INTERVAL_SECONDS=${intervalSeconds})`
      );
      return;
    }
    const intervalMs = intervalSeconds * 1e3;
    this.progress(`\u{1F4CA} periodic status logging every ${intervalSeconds} seconds`);
    this.statusLoggingTimer = setInterval(() => {
      this.statusLogging();
    }, intervalMs);
    this.statusLoggingTimer.unref();
  }
  /**
   * Stop periodic status logging
   */
  stopPeriodicStatusLogging() {
    if (this.statusLoggingTimer) {
      clearInterval(this.statusLoggingTimer);
      this.statusLoggingTimer = void 0;
      this.progress(`\u{1F4CA} stopped periodic status logging`);
    }
  }
  /**
   * Check if debug logging is enabled
   */
  isDebugLoggingEnabled() {
    return process.env.LOGGING?.includes("debug") || process.env.DEBUG === "1" || process.env.DEBUG === "true";
  }
  /**
   * Logs current server status
   */
  async statusLogging() {
    try {
      const uptime = process.uptime();
      const uptimeFormatted = `${Math.floor(uptime / 3600)}h ${Math.floor(uptime % 3600 / 60)}m ${Math.floor(uptime % 60)}s`;
      let replicationStatus = "DISABLED";
      let activePeers = 0;
      let totalPeers = 0;
      if (this.replicator) {
        totalPeers = this.discovery?.hosts?.filter((h) => h.serverId !== this.serverId).length || 0;
        activePeers = this.replicator.getActiveReplicants ? this.replicator.getActiveReplicants().length : 0;
        replicationStatus = `ENABLED (${activePeers}/${totalPeers})`;
      }
      let channelCount = 0;
      try {
        channelCount = await this.channelList.size();
      } catch (error) {
      }
      this.ops(
        `\u{1F4CA} Uptime: ${uptimeFormatted} | Replication: ${replicationStatus} | Channels: ${channelCount}`
      );
      if (this.isDebugLoggingEnabled()) {
        await this.logExtendedStatus(activePeers, totalPeers);
      }
    } catch (error) {
      this.warn(`\u{1F4CA} Error logging periodic status: ${error}`);
    }
  }
  /**
   * Log extended status with peer connection details (debug mode only)
   */
  async logExtendedStatus(activePeers, totalPeers) {
    try {
      if (!this.replicator || !this.discovery?.hosts) {
        return;
      }
      const allPeers = this.discovery.hosts.filter((h) => h.serverId !== this.serverId);
      const activeReplicants = this.replicator.getActiveReplicants ? this.replicator.getActiveReplicants() : [];
      const connectedPeers = activeReplicants.map((rep) => {
        const targetHost = rep.getTargetHost();
        return `${targetHost.serverId.slice(-8)}@${targetHost.address}:${targetHost.port}`;
      });
      const connectedServerIds = new Set(
        activeReplicants.map((rep) => rep.getTargetHost().serverId)
      );
      const nonConnectedPeers = allPeers.filter((h) => !connectedServerIds.has(h.serverId)).map((h) => `${h.serverId.slice(-8)}@${h.address}:${h.port}`);
      let channels = [];
      try {
        channels = await this.channelList.keys();
      } catch (error) {
      }
      const extendedStatus = [
        "\u{1F50D} EXTENDED STATUS:",
        `   Connected peers (${connectedPeers.length}): [${connectedPeers.join(", ") || "none"}]`,
        `   Non-connected peers (${nonConnectedPeers.length}): [${nonConnectedPeers.join(", ") || "none"}]`,
        `   Channels: [${channels.join(", ") || "none"}]`
      ].join("\n");
      this.info(extendedStatus);
    } catch (error) {
      this.warn(`\u{1F50D} Error logging extended status: ${error}`);
    }
  }
  async cleanupReplication() {
    this.debug(`cleaning up replicator`);
    if (!this.replicator) {
      this.debug("replication not active; no cleanup needed");
      return;
    }
    try {
      await Promise.race([
        this.replicator.cleanup(),
        new Promise(
          (_, reject) => setTimeout(() => reject(new Error("Replication cleanup timeout")), 5e3)
        )
      ]).then(() => {
        this.progress(`cleaned up replicator`);
      });
    } catch (error) {
      this.logger.error(`during replication cleanup:`, error.stack);
    } finally {
      this.replicator = void 0;
    }
  }
  async cleanupRedisConnections() {
    return Promise.allSettled([
      this.channelList.cleanup(),
      this.channelOptions.cleanup(),
      this.knownMessages.cleanup()
    ]).then(() => {
      this._knownMessages = void 0;
      this.channelList = void 0;
      this.channelOptions = void 0;
    });
  }
  async close() {
    this.cancelSubscribers();
    await this.cleanupRedisConnections();
    await this.cleanupReplication();
    this.stopPeriodicStatusLogging();
    this.listener?.close();
  }
  async listenDetails() {
  }
  get address() {
    const { listener } = this;
    if (!listener) throw new Error(`not yet listening`);
    listener.address();
    throw new Error(`is this needed?`);
  }
  // just use `info`
  // log(a1: string, ...args: any[]) {
  //     this.logger.info(a1, ...args);
  // }
  info(a1, ...args) {
    this.logger.info(a1, ...args);
  }
  warn(a1, ...args) {
    this.logger.warn(a1, ...args);
  }
  progress(a1, ...args) {
    this.logger.progress(a1, ...args);
  }
  ops(a1, ...args) {
    this.logger.ops(a1, ...args);
  }
  debug(a1, ...args) {
    this.logger.debug(a1, ...args);
  }
  trace(a1, ...args) {
    this.logger.trace(a1, ...args);
  }
  async logInfo() {
    const serverId = this.serverId;
    const neighborhood = this.nbh || "cardano-after-dark";
    let serverAddress = "unknown";
    let serverPort = "unknown";
    if (this.myServerInfo) {
      serverAddress = this.myServerInfo.address;
      serverPort = this.myServerInfo.port;
    }
    let channelsList = "none";
    try {
      const channels = await this.channelList.keys();
      const publicChannels = channels.filter((ch) => ch[0] !== "_");
      channelsList = publicChannels.join(", ") || "none";
    } catch (error) {
      channelsList = "error retrieving channels";
    }
    let discoveryHosts = "unknown";
    if (this.discovery && this.discovery.hosts) {
      const hosts = this.discovery.hosts.map((h) => `${h.serverId}@${h.address}:${h.port}`);
      discoveryHosts = hosts.join(", ");
    }
    const logMessage = [
      `DredServer - ID, Status : ${serverId}, ${this.listener ? "running" : "stopped"} `,
      `  - Server Address:Port : ${serverAddress}:${serverPort}`,
      `  - Redis URL, DB       : ${this.redisUrl}, ${this.redisDb}`,
      `  - Discovery Hosts     : [${discoveryHosts}]`,
      `  - Neighborhood        : ${neighborhood}`,
      `  - Available Channels  : [${channelsList}]`,
      `  - Active Subscribers  : ${this.subscribers.size}`,
      ``
    ].join("\n");
    return logMessage;
  }
  reqLogger(res) {
    return zonedLogger("dred:req", {
      loggerId: res.locals.id,
      clientid: res.locals.clientid,
      color: bgGreenBright.start + black.start
    });
  }
  async channelCreated(channel, options) {
    //! it allows specific subclass of dred server to be notified of channel-creation
    const streams = this.channelConn;
    const chans = await streams.use("_chans");
    this.debug("channelCreated", channel, options);
    //! it emits a channel-created event in the _chans meta-channel.
    await streams.produce(chans, "a channel was created", {
      type: "chanCreated",
      ocid: nanoid(8),
      msg: JSON.stringify({
        channel,
        options
      })
    });
  }
  async getChanOptions(channelName) {
    const obj = await this.channelOptions.get(channelName);
    return obj;
  }
  async setChanOptions(channelName, options) {
    await this.channelOptions.set(channelName, options);
  }
  async mkChannelProducer(channelId) {
    return this.channelConn.use(channelId);
  }
  cancelSubscribers() {
    let count = 0;
    for (const [chan, subscribers] of this.subscribers) {
      for (const sub of subscribers) {
        sub.cancel();
        count++;
      }
    }
    this.warn(`Cancelled ${count} channel subscribers`);
  }
  get subscribeTimeout() {
    return 1e4;
  }
  async listenToNeighborhood() {
    //!!! todo: it connects with a DredClient for each neighborhood host
    //!!! todo: it subscribes to all channels in the neighborhood
    //!!! todo: it keeps a recency list of messages seen from other servers,
  }
  async listenOneChannel(res, sub, sendUpdate, notifyConsumerError) {
    const channelInfo = await this.channelConn.use(sub.channel);
    //! todo: for "$" bookmarks, it can tap into an existing stream connection as a listener
    //! todo: for non-$ bookmarks, it can use an ephemeral bookmark-to-now connection 
    await this.channelConn.subscribe(channelInfo);
    //! it spawns asynchronous monitoring in each channel
    this.monitorChannelChanges(res, channelInfo, sub, sendUpdate, notifyConsumerError);
    return channelInfo;
  }
  async monitorChannelChanges(res, streamInfo, sub, sendUpdate, notifyConsumerError) {
    const { bookmark = "$" } = sub.options;
    try {
      for await (const events of this.channelConn.consume(
        streamInfo,
        "all",
        10,
        this.subscribeTimeout,
        bookmark
      )) {
        for (const e of events) {
          const { id: mid, ocid, type, data, ...meta } = e;
          this.reqLogger(res).trace(
            `    <- ocid %s in %s: %d bytes`,
            ocid,
            sub.channel,
            e.data.length
          );
          //!!! todo: apply filters from the subscription
          sendUpdate({
            mid,
            channel: sub.channel,
            type,
            nbh: this.nbh,
            msg: data,
            ocid,
            ...meta
          });
        }
      }
    } catch (consumeError) {
      notifyConsumerError(res, sub.channel, consumeError);
    }
  }
}
async function createServer(options, serverId, serverDb, serverClass) {
  const SC = serverClass ?? DredServer;
  const server = new SC(options, serverId, serverDb);
  const { api, redis } = server;
  api.set("redis", redis);
  api.use(express.json({}));
  new RedisSet(redis);
  return server;
}

export { DredServer, createServer };
//# sourceMappingURL=dred-server.mjs.map
