'use strict';

var Redis = require('ioredis');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var compression = require('compression');
var uuid = require('uuid');
var abstractLoggingInterface = require('abstract-logging');
var fetch$1 = require('cross-fetch');
var nanoid$1 = require('nanoid');
var nacl = require('tweetnacl');
var util = require('tweetnacl-util');
var EventEmitter = require('eventemitter3');
var utils = require('@poshplum/utils');
var web = require('node:stream/web');
var node_stream = require('node:stream');
var watsign = require('watsign');

function _interopNamespaceDefault(e) {
	var n = Object.create(null);
	if (e) {
		Object.keys(e).forEach(function (k) {
			if (k !== 'default') {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () { return e[k]; }
				});
			}
		});
	}
	n.default = e;
	return Object.freeze(n);
}

var abstractLoggingInterface__namespace = /*#__PURE__*/_interopNamespaceDefault(abstractLoggingInterface);

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
    this._workInTeam = false;
    this._consumerIsGennerated = true;
    if (typeof channels[opt.LOG] === "undefined") {
      this._log = { ...abstractLoggingInterface__namespace };
    } else {
      this._log = channels[opt.LOG];
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
      this._log.error("Use error: %o", error);
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
      this._log.error("Delete error: %o", error);
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
      if (typeof tunnel === "undefined" || typeof tunnel[tun.KEY] === "undefined") {
        throw new RedisChannelsError(
          "Can not subscribe, no valid tunnel object"
        );
      }
      if (typeof consumer === "undefined") {
        tunnel[tun.CONSUMER] = uuid.v4().replace(/-/g, "");
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
      try {
        await this._nonBlockRedisClient.xgroup([
          "CREATE",
          tunnel[tun.KEY],
          tunnel[tun.TEAM],
          "$",
          "MKSTREAM"
        ]);
        await this._deleteRedisConsumerAndGroup(tunnel);
      } catch {
      }
      if (!(tunnel[tun.CONSUMER] in this._consumers)) {
        tunnel[tun.CONNECTION] = this._duplicateRedisClient();
        this._consumers[tunnel[tun.CONSUMER]] = tunnel;
      }
    } catch (error) {
      this._log.error("Subscribe error: %o", error);
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
      await this._nonBlockRedisClient.xadd([
        tunnel[tun.KEY],
        "MAXLEN",
        "~",
        this._overflow,
        "*",
        ...f
      ]);
    } catch (error) {
      this._log.error("Unsubscribe error: %o", error);
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
      this._log.error("Produce error:", error.stack || error.message || JSON.stringify(error));
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
      let unsubscribing = false;
      let currentId = fromId;
      let lastId;
      if (fromId === ">" && this._workInTeam === false) {
        currentId = "$";
      }
      while (true) {
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
      this._log.error("Consume error: %o", error);
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
    for (const i in this._consumers) {
      await this._deleteRedisConsumerAndGroup(this._consumers[i], true);
      await this._consumers[i][tun.CONNECTION].quit();
      this._consumers[i][tun.CONNECTION].removeAllListeners();
      delete this._consumers[i];
    }
    await this._nonBlockRedisClient.quit();
    this._nonBlockRedisClient.removeAllListeners();
  }
  /*
   * Deletes a redis consumer and a group
   */
  // --------------------------------------------------------------------------|
  async _deleteRedisConsumerAndGroup(tunnel, force = false) {
    try {
      if (this._workInTeam === false || force) {
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
      for (let i = 0; i < this._slots; i++) {
        await this._nonBlockRedisClient.zincrby([this._keyZset, 0, i]);
      }
    } catch (error) {
      this._log.error("_initShardScores error: %o", error);
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
    const redis = this._nonBlockRedisClient.duplicate();
    redis.addListener("error", () => {
    });
    return redis;
  }
}

const devMessage = Symbol("?developer?");
//! it provides a type facade to describe available events

//! converts a nodejs Readable Stream as returned by `node-fetch` and `cross-fetch`
function nodeToWebStream(nodeStream) {
  var destroyed = false;
  var listeners = {};
  function start(controller) {
    listeners["data"] = onData;
    listeners["end"] = onData;
    listeners["end"] = onDestroy;
    listeners["close"] = onDestroy;
    listeners["error"] = onDestroy;
    for (var name in listeners) nodeStream.on(name, listeners[name]);
    nodeStream.pause();
    function onData(chunk) {
      if (destroyed) return;
      controller.enqueue(chunk);
      nodeStream.pause();
    }
    function onDestroy(err) {
      if (destroyed) return;
      destroyed = true;
      for (var name2 in listeners)
        nodeStream.removeListener(name2, listeners[name2]);
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
    for (var name in listeners)
      nodeStream.removeListener(name, listeners[name]);
    nodeStream.push(null);
    nodeStream.pause();
    if (nodeStream.destroy) nodeStream.destroy();
    else if (nodeStream.close) nodeStream.close();
  }
  return new web.ReadableStream({ start, pull, cancel });
}

//! purpose: allows server-side code to handle fetch() responses with a streaming
const ReadableStream = web.ReadableStream;
function fromPlatformFetchBody(b) {
  if (b instanceof node_stream.Readable) return nodeToWebStream(b);
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
const connectionStates = {
  logLevel: "info",
  connecting: {
    default: true,
    onEntry() {
      this.connect().then(this.mkTransition("connected"), (e) => {
        this.lastError = e;
        this.transition("retry");
      });
    },
    abort: "aborted",
    retry: "retrying",
    connected: "connected"
  },
  retrying: {
    failed: "failed",
    reconnect: {
      nextState: "connecting",
      effect() {
        this.connect();
      }
    },
    abort: "aborted",
    async onEntry() {
      this.attempts += 1;
      if (this.attempts > this.settings.maxRetries) return this.transition("failed");
      this.retryLater();
    }
  },
  connected: {
    onEntry() {
      this.events.emit("connected", {
        connection: this,
        message: "successful connection to neighborhood host",
        attempts: this.attempts,
        delayTime: this.elapsedTime(),
        [devMessage]: [
          "The connection is established and will emit 'message' events when received from the host."
        ]
      });
    },
    abort: "aborted",
    disconnected: {
      nextState: "disconnected",
      predicate() {
        return !this.abortController?.signal.aborted;
      },
      effect() {
        //!!! todo: put the event trigger more directly in the spot where disconnection is detected (with any error message), plus the transition()
        this.events.emit("disconnected", {
          message: "server disconnected",
          connection: this,
          reason: "... from new location TBD",
          [devMessage]: [
            "no action needed; ConnectionManager will retry"
          ]
        });
      }
    }
  },
  failed: {
    onEntry() {
      this.events.emit(
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
      );
    }
  },
  //! aborts (from 'disconnected') and disconnects (from 'aborted') don't change the terminal states.
  disconnected: {
    //! disconnection is terminal; should be freed and garbage collected
    abort: "disconnected",
    onEntry() {
      this.stopRetries();
    }
  },
  aborted: {
    //! an aborted connection is terminal; should be freed and garbage collected
    disconnected: "aborted",
    onEntry() {
      this.stopRetries();
    }
  }
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
const _HostConnection = class _HostConnection extends utils.StateMachine.withDefinition(
  connectionStates,
  "connection-manager"
) {
  constructor(host, subscriptions, settings) {
    super({
      contextLabel: `connection:${host.serverId}`,
      currentState: "default",
      logFacility: "connection:state",
      contextObject: null
    });
    __publicField$a(this, "events", new EventEmitter.EventEmitter());
    __publicField$a(this, "abortController");
    __publicField$a(this, "host");
    __publicField$a(this, "settings");
    __publicField$a(this, "attempts", 0);
    __publicField$a(this, "lastError");
    __publicField$a(this, "channelSubs");
    __publicField$a(this, "stream");
    __publicField$a(this, "startTime", (/* @__PURE__ */ new Date()).getTime());
    __publicField$a(this, "scheduledRetry");
    __publicField$a(this, "_status");
    __publicField$a(this, "connecting");
    __publicField$a(this, "heartbeatInterval", 1e4);
    __publicField$a(this, "lastHeartbeat", (/* @__PURE__ */ new Date()).getTime());
    __publicField$a(this, "heartbeatTimer");
    ({
      ...settings
    });
    this.settings = _HostConnection.settingsWithDefaults(settings);
    this.events.on("replacedBy", ({}) => {
    });
    this.host = host;
    this.channelSubs = subscriptions;
    this.connecting = this.connect();
  }
  // assigned by state-machine
  //@ts-expect-error -  base class has void as return type.  fix when state machine gets typescript love.
  set currentState(v) {
    this._status = v;
  }
  //@ts-expect-error -  base class has void as return type.  fix when state machine gets typescript love.
  get currentState() {
    return this._status;
  }
  elapsedTime() {
    const now = /* @__PURE__ */ new Date();
    return now.getTime() - this.startTime;
  }
  retryLater() {
    const retryInterval = this.nextRetryInterval();
    const { maxRetries } = this.settings;
    //!!! todo: it only emits a warning if this.events.listeners indicates nobody is listening for the 'retrying' event.
    this.events.emit(
      "warning",
      this.mkEvent({
        message: `connection error; will retry in ${Math.floor(
          retryInterval / 1e3
        )} seconds`,
        [devMessage]: "subscribe to 'retrying' to remove this warning.",
        retryCount: this.attempts,
        maxRetries
      })
    );
    this.scheduledRetry = setTimeout(this.mkTransition("reconnect"), retryInterval);
    this.events.emit(
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
    );
  }
  eventWithMessage(m, e) {
    return {
      message: ``,
      ...e
    };
  }
  nextRetryInterval() {
    return Math.min(
      this.settings.retryBaseIntervalMs * Math.pow(1.27, this.attempts),
      this.settings.retryMaxIntervalMs
    );
  }
  disconnect(reason) {
    //!!! todo: cancel any pending stream with ReadableStream.cancel()
    if (this.abortController) this.abortController.abort(`disconnect(): ${reason}`);
    this.stopRetries();
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
      ...partialSettings
    };
  }
  async connect() {
    this.abortController = new AbortController();
    const { signal } = this.abortController;
    signal.addEventListener("abort", () => {
      this.transition("abort");
    });
    this.connecting = new Promise((res, rej) => {
      let aborted = false;
      this.fetch(`/channels/listen`, {
        body: JSON.stringify(this.channelSubs, null, 2),
        method: "POST",
        signal,
        headers: { "content-type": "application/json" }
      }).then((response) => {
        if (aborted) return false;
        if (this.abortController?.signal.aborted) return false;
        //!!! todo: check to see if we shoudl reject with an empty / non-existent response here
        if (!response) return false;
        res(true);
      }).catch((e) => {
        debugger;
        if (this.isAbortError(e)) {
          aborted = true;
        } else {
          console.warn(`fetch error; see debugger - `, e);
          this.events.emit("failed", this.connectionFailureEvent(e));
          debugger;
        }
      });
    });
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
    const result = await fetch(url, options);
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
      } else {
        console.warn(`fetch error during read; see debugger - `, e);
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
        debugger;
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
        const { heartbeatInterval } = value;
        this.heartbeatInterval = heartbeatInterval;
        continue;
      }
      if ("warning" == value?.type) {
        //!!! todo: consider how & whether integrate this so that the warning becomes actionable
        console.log("warning from host", this.host.serverId, ":", value);
        debugger;
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
  utils.autobind
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
//!!! todo zw3w737: it has a way of posting the same unique message to multiple servers,
const connectionManagerStates = {
  logLevel: "info",
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
      if (!this.channelSubs?.size) {
        console.log("    \u{1F41E} ConnectionManager: pendingSetup: deferred until channel subscriptions are set");
        return;
      }
      const hosts = this.discovery.hosts;
      if (hosts?.length && !this.hosts) {
        this.hosts = hosts;
      }
      if (this.hosts?.length)
        return this.transition("readyToConnect");
      console.log("    \u{1F41E}  pendingSetup: waiting for host discovery");
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
    onEntry() {
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
    partial: "partiallyConnected",
    replaceSubs: "replacingSubs"
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
    onEntry() {
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
    partial: "degraded",
    updatedHostList: "connecting"
  },
  degraded: {
    onEntry() {
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
    onEntry() {
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
        [devMessage]: [
          "tbd"
        ]
      });
    },
    reconnect: "connecting"
  }
};
class ConnectionManager extends utils.StateMachine.withDefinition(
  connectionManagerStates,
  "connection-manager"
) {
  constructor(options) {
    super({
      contextLabel: "connection-manager",
      currentState: "discoveringNbh",
      logFacility: "connection-manager:state",
      contextObject: null
    });
    __publicField$9(this, "state", "pending");
    __publicField$9(this, "discovery");
    __publicField$9(this, "hosts");
    __publicField$9(this, "events", new EventEmitter.EventEmitter());
    __publicField$9(this, "waitFor");
    //! it keeps a current list of target event-subscriptions
    __publicField$9(this, "channelSubs");
    //! it remembers the last set of subscriptions, while the next set is being established.
    __publicField$9(this, "lastChannelSubs");
    //! it is initialized with connection settings used for tuning behavior of outgoing connections
    __publicField$9(this, "connectionSettings");
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
    __publicField$9(this, "logger");
    this.connectionSettings = HostConnection.settingsWithDefaults(options.connectionSettings);
    this.discovery = options.discovery;
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
          host
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
  async setSubscriptions(subs) {
    if (this.channelSubs) return this.replaceSubscriptions(subs);
    this.channelSubs = subs;
    if (!this.hosts) {
      if (this.discovery.hosts?.length) {
        this.hosts = this.discovery.hosts;
      } else {
        console.log("setSubscriptions: waiting for hosts:ready from discovery");
        await new Promise((resolve) => this.discovery.events.once("hosts:ready", resolve));
      }
    }
    this.connectToHosts();
    return subs;
  }
  async replaceSubscriptions(subs) {
    this.lastChannelSubs = this.channelSubs;
    this.channelSubs = subs;
    const promises = [];
    for (const host of this.hostToConn.keys()) {
      promises.push(this.replaceHostConnection(host));
    }
    Promise.all(promises).then(() => {
      this.lastChannelSubs = void 0;
    });
    return subs;
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
    if (!this.channelSubs)
      throw new Error(
        // makes typescript happy
        `missing channelSubs; should already have a reasonable default value`
      );
    //! it gathers a list of channels and subscription settings to use for this conection
    const subscriptions = [];
    for (const sub of Object.values(this.channelSubs)) {
      subscriptions.push(sub.options);
    }
    const conn = new HostConnection(host, subscriptions, this.connectionSettings);
    conn.events.on("connected", this.healthyConnection);
    conn.events.on("disconnected", this.cleanupConnection);
    conn.events.on("replacedBy", this.cleanupConnection);
    conn.events.on("failed", this.cleanupConnection);
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
    this.logger.info({ summary: `connection to ${connection.host.address}` }, "healthy");
    //! it does NOT need to trigger event 'replacedBy', because replaceHostConnection() takes that responsibility
    this.checkConnectionState();
  }
  cleanupConnection(event) {
    const { connection, message } = event;
    console.log("cleanup: ", connection.host.address, message);
    this.moveConnTo(connection, "disconnected");
    this.graveyard.add(connection);
  }
  notifySubscribers(event) {
    const { channel } = event;
    if (!this.channelSubs) {
      console.log("no listeners to hear about:", event);
      return;
    }
    const sub = this.channelSubs[channel];
    sub?.notify(event);
  }
  async replaceHostConnection(host) {
    const replacingConn = this.hostToConn.get(host);
    const replacement = this.connectTo(host);
    //! it starts a replacement connection and hopes to complete the new connection quickly.
    return new Promise((resolve, reject) => {
      let timeout;
      replacement.events.once("connected", ({ connection }) => {
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
          resolve(replacement);
        }
      });
      //! if the new connection doesn't connect promptly, it...
      asyncDelay(this.connectionSettings.connectionWaitTimeMs).then(() => {
        this.moveConnTo(replacement, "pending");
        const oldConnection = replacingConn;
        oldConnection && this.moveConnTo(oldConnection, "obsolete");
        if (timeout !== false) {
          timeout = true;
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
}
__decorateClass$1([
  utils.autobind
], ConnectionManager.prototype, "setHostList");
__decorateClass$1([
  utils.autobind
], ConnectionManager.prototype, "healthyConnection");
__decorateClass$1([
  utils.autobind
], ConnectionManager.prototype, "cleanupConnection");
__decorateClass$1([
  utils.autobind
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
    const sigBuf = await watsign.sign(buf, this.identity.secretKey);
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
    return watsign.verify(strBuf, sigBuf, keyBuf);
  }
}
__publicField$8(StringNacl, "newKeyPair", watsign.newKeyPair);

var __defProp$7 = Object.defineProperty;
var __defNormalProp$7 = (obj, key, value) => key in obj ? __defProp$7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$7 = (obj, key, value) => __defNormalProp$7(obj, typeof key !== "symbol" ? key + "" : key, value);
class Discovery {
  constructor(options) {
    __publicField$7(this, "nbh");
    // neighborhood
    __publicField$7(this, "hosts");
    __publicField$7(this, "events", new EventEmitter.EventEmitter());
    const { neighborhood } = options;
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

var __defProp$6 = Object.defineProperty;
var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$6 = (obj, key, value) => __defNormalProp$6(obj, key + "" , value);
class NeighborhoodDiscovery extends Discovery {
  constructor(options) {
    const { neighborhood } = options;
    super(options);
    __publicField$6(this, "neighborhood");
    if (neighborhood) this.neighborhood = neighborhood;
  }
  static forNeighborhood(n) {
    return new this({ neighborhood: n });
  }
  async getNeighborhoods() {
    return ["cardano-after-dark"];
    //!!! todo: use discovery service to find registered neighborhoods
  }
  async getHostList() {
    console.warn(`Discovery in neighborhood has no impl yet.  Try DevEnvLocalDiscovery for now`);
    return [];
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

var __defProp$5 = Object.defineProperty;
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$5 = (obj, key, value) => __defNormalProp$5(obj, typeof key !== "symbol" ? key + "" : key, value);
//! represents a configuration for monitoring a specific channel
//! it includes alt-values for optional attributes for developers to easily see 
class ChannelSubscriptionListener {
  // XXevents: EventEmitter<ChannelSubEvents>;
  constructor(options) {
    __publicField$5(this, "options");
    __publicField$5(this, "recentMsgs");
    __publicField$5(this, "listener");
    const { listener, ...rest } = options;
    this.options = rest;
    //! it has a recent-messages map, not included in a JSON representation of the subscription
    this.recentMsgs = /* @__PURE__ */ new Set();
    this.listener = listener;
  }
  notify(event) {
    const { mid: msgId, ocid: originalClientId, connection, message, details, neighborhood, channel } = event;
    const seen = this.recentMsgs;
    if (!seen.has(originalClientId) && !seen.has(msgId)) {
      seen.add(msgId);
      this.listener(event);
    }
  }
}

var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc(target, key) ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result) __defProp$4(target, key, result);
  return result;
};
var __publicField$4 = (obj, key, value) => __defNormalProp$4(obj, typeof key !== "symbol" ? key + "" : key, value);
const { sign } = nacl;
const nanoid = nanoid$1.customAlphabet("0123456789abcdefghjkmnpqrstvwxyz", 12);
const {
  magenta
} = colors;
const { encodeUTF8: encodeUTF8$1, decodeUTF8: decodeUTF8$1, encodeBase64: encodeBase64$1, decodeBase64: decodeBase64$1 } = util;
const nbhChannelList = "_chans";
const nbhAuthInfo = "_auth";
const logging$1 = parseInt(process.env.LOGGING || "");
//! it runs onEntry() and predicate() hooks always in context
const clientStates = {
  // logLevel: "info",
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
      this.events.emit("hasChannels", {
        nbh: this.neighborhoodId,
        message: "found channel list",
        channels: chans,
        [devMessage]: [
          `The list of channels is ready to present to users, or has been refreshed.`,
          `You should reconcile any application-side list of subscribed channels`
        ]
      });
    },
    hasChannels: "ready"
  },
  ready: {
    async onEntry() {
    }
  }
};
class DredClient extends utils.StateMachine.withDefinition(clientStates, "client") {
  constructor(args) {
    super({
      contextLabel: args.name || "dred-client",
      currentState: "default",
      logFacility: "dred-client:state",
      contextObject: null
    });
    __publicField$4(this, "args");
    __publicField$4(this, "events", this.ensureEmitterExists());
    __publicField$4(this, "connManager");
    __publicField$4(this, "channels", []);
    __publicField$4(this, "neighborhoodId", "cardano-after-dark");
    __publicField$4(this, "availableNeighborhoods", []);
    // neighborhoodContractAddress = "9bef...";
    __publicField$4(this, "discovery");
    __publicField$4(this, "identity");
    __publicField$4(this, "signer");
    __publicField$4(this, "pubKeyString");
    __publicField$4(this, "logger");
    __publicField$4(this, "insecure");
    __publicField$4(this, "_subscriptions");
    __publicField$4(this, "subscribers", /* @__PURE__ */ new Map());
    __publicField$4(this, "channelSub");
    __publicField$4(this, "authSub");
    __publicField$4(this, "messageHandler");
    __publicField$4(this, "_status");
    this.events = this.ensureEmitterExists();
    let { name: clientName } = args;
    clientName = clientName ? `client-\u2039${clientName}\u203A` : "dred-client";
    this.logger = utils.zonedLogger(clientName, {
      color: magenta.start,
      levels: { [clientName]: logging$1 ? "info" : "warn", _message: `(env LOGGING=${logging$1})` }
    });
    this._status = this._status || "default";
    this.args = args;
    const discovery = this.constructor.resolveDiscovery(args);
    this.discovery = discovery;
    this.connManager = new ConnectionManager({
      discovery,
      waitFor: this.args.waitFor,
      connectionSettings: this.args.connectionSettings || {}
    });
    this.transition("default");
    //!!! make this test-only
  }
  ensureEmitterExists() {
    return this.events = this.events || new EventEmitter();
  }
  log(a1, ...args) {
    this.logger.info(a1, ...args);
  }
  warn(a1, ...args) {
    this.logger.warn(a1, ...args);
  }
  setNeighborhood(n) {
    this.neighborhoodId = n;
    utils.asyncDelay(1).then(this.mkTransition("nbhSelected"));
  }
  async subscribeToChannels(arg) {
    let smap;
    if (Array.isArray(arg)) {
      if (!this.messageHandler) {
        throw new Error(
          `to use subscribeToChannels with an implicit subscriber, set client's messageHandler first`
        );
      }
      smap = {};
      for (const channel of arg) {
        smap[channel] = this.messageHandler;
      }
    } else if ("string" === typeof arg) {
      if (!this.messageHandler) {
        throw new Error(
          `to use subscribeToChannels with an implicit subscriber, set client's messageHandler first`
        );
      }
      smap = { [arg]: this.messageHandler };
    } else {
      smap = arg;
    }
    this.subscriptions = await this.connManager.setSubscriptions(this.mkChannelSubs(smap));
  }
  onTransition() {
    //! tbd if we need to use this hook, perhaps for persisting the bookmark state of channels
  }
  static resolveDiscovery({ neighborhood, discovery }) {
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
      nbh: this.neighborhoodId,
      status: this._status,
      channels: this.channels
    });
  }
  //! it creates a new subscriptions object
  //! it recycles existing subscriptions
  mkChannelSubs(smap) {
    const subs = {};
    subs[nbhChannelList] = this.channelSub = this.getChannelSub(
      nbhChannelList,
      this.processChannelsMsg
      //! it watches for events relating to channel lifecycle
    );
    subs[nbhAuthInfo] = this.authSub = this.getChannelSub(
      nbhAuthInfo,
      this.processAuthMsg
      //! it watches for events relating to authentication lifecycle
    );
    for (const [chan, listener] of Object.entries(smap)) {
      subs[chan] = this.getChannelSub(chan, listener);
    }
    return subs;
  }
  processChannelsMsg(m) {
    //!!! todo: it notifies client listeners about created or removed channels
    //!!! todo: it emits the generic state-updated event with updated channel list
  }
  processAuthMsg(m) {
    //!!! todo: ??? it notifies listeners when authentication is required by one or more neighborhood hosts 
    //!!! todo: it notifies listeners when a requested channel requires authentication not yet established
    //!!! todo: notifies listening application of new identities joining the neighborhood {type: "newId", pubKey, handle, certificates}
    //!!! todo: notifies listening application of any certifications added by an identity's owner or neighborhood trustees
    //!!! todo: notifies listening application of any key revocations or decertifications from owner or trustees
  }
  //! it unlistens from subscriptions no longer being used
  set subscriptions(replacement) {
    for (const [chan, sub] of Object.entries(this._subscriptions || {})) {
      //!!! todo: match subscription filter settings
    }
    this._subscriptions = replacement;
  }
  get subscriptions() {
    if (!this._subscriptions) return {};
    return this._subscriptions;
  }
  getChannelSub(channel, listener) {
    const found = this.subscriptions[channel];
    if (found) return found;
    return this.mkChannelSub(channel, listener);
  }
  //! it creates new subscriptions and wires them up for notification to client application
  //! it doesn't require client applications to guard for memory / event-listener leakage
  mkChannelSub(channel, listener) {
    const sub = new ChannelSubscriptionListener({
      neighborhood: this.neighborhoodId,
      channel,
      listener
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
    let host = (await this.discovery.getHostList())[0];
    const proto = host.insecure ? "http" : "https";
    const shortServer = `${host.address}:${host.port}`;
    const url = `${proto}://${shortServer}${path}`;
    const result = await fetch$1(url, options);
    if (debug) debugger;
    if (result.ok) {
      if (!parse) return result;
      return result.json();
    }
    debugger;
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
    const {
      ...otherBodyAttrs
    } = options;
    const body = JSON.stringify(otherBodyAttrs);
    try {
      return await this.fetch(`/channel/${channelName}`, {
        method: "POST",
        body,
        headers: {
          "content-type": "application/json",
          accept: "application/json"
        }
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
          accept: "application/json"
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
  async postMessage(channelName, oMsg) {
    const sub = this.subscriptions[channelName];
    const message = { ...oMsg };
    this.logger.info("posting message ", message);
    let { type, ocid, msg } = message;
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
    //! it guards usage for non-typescript users
    if (!(type && msg)) {
      debugger;
      throw new Error(`missing required 'type' and/or 'message'`);
    }
    const result = await this.fetch(`/channel/${channelName}/message`, {
      method: "POST",
      body: JSON.stringify(message),
      headers: {
        "content-type": "application/json",
        accept: "application/json"
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
  utils.autobind
], DredClient.prototype, "emitState");
__decorateClass([
  utils.autobind
], DredClient.prototype, "processChannelsMsg");
__decorateClass([
  utils.autobind
], DredClient.prototype, "processAuthMsg");

var __defProp$3 = Object.defineProperty;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$3 = (obj, key, value) => __defNormalProp$3(obj, typeof key !== "symbol" ? key + "" : key, value);
class RedisSet {
  constructor(redis, key = "_abstract") {
    __publicField$3(this, "redis");
    __publicField$3(this, "key");
    __publicField$3(this, "abstract");
    this.redis = redis;
    this.key = key;
    this.abstract = !!(key === "_abstract");
  }
  async has(key, setName) {
    if (this.abstract && !setName)
      throw new Error(`abstract RedisSet requires setName in arg2`);
    return this.redis.call("SISMEMBER", setName || this.key, key);
  }
  async add(key, setName) {
    if (this.abstract && !setName)
      throw new Error(`abstract RedisSet requires setName in arg2`);
    return this.redis.call("SADD", this.key, key);
  }
  async delete(key, setName) {
    if (this.abstract && !setName)
      throw new Error(`abstract RedisSet requires setName in arg2`);
    return this.redis.call("SREM", this.key, key);
  }
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
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
    __publicField$2(this, "redis");
    __publicField$2(this, "hashName");
    __publicField$2(this, "abstract");
    __publicField$2(this, "adapter");
    this.redis = redis;
    this.hashName = hashName;
    this.adapter = adapter;
    this.abstract = !!(hashName === "_abstract");
  }
  async get(key, hashName) {
    if (this.abstract && !hashName)
      throw new Error(`abstract RedisHash requires hashName in arg2`);
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
    const hName = hashName || this.hashName;
    const v = await this.get(key, hName);
    return !!v;
  }
  async keys(hashName) {
    if (this.abstract && !hashName)
      throw new Error(`abstract RedisHash requires hashName in arg1`);
    const hName = hashName || this.hashName;
    return this.redis.call("HKEYS", hName);
  }
  async set(key, value, hashName) {
    if (this.abstract && !hashName)
      throw new Error(`abstract RedisHash requires hashName in arg3`);
    const hName = hashName || this.hashName;
    const v = this.adapter.toRedis(value);
    return this.redis.call("HSET", hName, key.toString(), v);
  }
  async delete(key, hashName) {
    if (this.abstract && !hashName)
      throw new Error(`abstract RedisHash requires hashName in arg2`);
    const hName = hashName || this.hashName;
    return this.redis.call("HDEL", hName, key.toString());
  }
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => __defNormalProp$1(obj, key + "" , value);
const { encodeUTF8, decodeUTF8, encodeBase64, decodeBase64 } = util;
const localNbh = "localhost-nbh";
class StaticHostDiscovery extends Discovery {
  constructor(options) {
    const {
      neighborhood,
      hosts
    } = options;
    if (neighborhood) throw new Error(`DevEnvLocalDiscovery always uses ` + localNbh);
    super({ neighborhood: localNbh });
    __publicField$1(this, "hosts");
    this.hosts = hosts || StaticHostDiscovery.defaultHosts();
  }
  async getNeighborhoods() {
    await utils.asyncDelay(1);
    return [localNbh];
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
    return [{
      serverId: "singleton",
      address: "127.0.0.1",
      port: 3029,
      insecure: true
      // publicKey: this.getPubKeyFromFs(3029),
    }];
  }
  setupDefaultHosts() {
    return this.reset(this.constructor.defaultHosts());
  }
  async initHostDiscovery() {
    this.setupDefaultHosts();
  }
  toJSON() {
    return { localDevHosts: this.hosts };
  }
  async getHostList() {
    if (!this.hosts) throw new Error(`call setupDefaultHosts()`);
    await utils.asyncDelay(1);
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

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const {
  bgBlueBright,
  bold,
  black
} = colors;
const logging = parseInt(process.env.LOGGING || "0");
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
//!!! todo: augment to support a list of nbh's, with req details for nbh selection
let clientIndex = 1;
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
    __publicField(this, "resetting", false);
    __publicField(this, "setupPending");
    __publicField(this, "resultLogger", (req, res, next) => {
      const now = (/* @__PURE__ */ new Date()).getTime();
      const elapsed = now - res.locals.startTime;
      this.log(`<- ${res.statusCode} ${req.method} ${req.originalUrl || req.url} ${elapsed}ms`);
    });
    __publicField(this, "getChannels", async (req, res, next) => {
      const found = await this.channelList.keys();
      const channels = found.filter((x) => x[0] !== "_");
      res.status(200).json({ channels });
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
        this.warn(`Join failed: Channel ${channelId} is expired`);
        this.log(
          `expiration '${opts.expiresAt.getTime() % 1e5}, now '${now.getTime() % 1e5}`
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
        this.log("owner-approved join");
      } else if ("member" == opts.approveJoins && (opts.members || []).includes(myId)) {
        //! a member can join someone by pubKey if approveJoins: member
        this.log("member-approved join");
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
          this.log("self-join");
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
      this.log("postMessageInChannel", channelId);
      const found = await this.channelList.has(channelId);
      if (!found) {
        res.status(404).json({
          error: "channel not found"
        });
        return next();
      }
      const message = req.body;
      //!!! todo y0w9cvr: it refuses to post plain-text messages into encrypted channels
      message.sourceServer = this.serverId;
      this.log("server: postMessage", message);
      const tunnelProducer = await this.mkChannelProducer(channelId);
      const { msg, _type, _data, ...moreDetails } = message;
      //! it extracts and SILENTLY ignores reserved keys _type, _data in client-provided event details.
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
        const id = await this.channelConn.produce(tunnelProducer, msg, moreDetails);
        res.json({ id, status: "created" });
      }
      next();
    });
    __publicField(this, "listenOnChannels", async (req, res, next) => {
      let cancelled = false;
      const subscriptions = req.body;
      res.contentType("application/ndjson");
      res.useChunkedEncodingByDefault = false;
      this.log("listening for", subscriptions);
      //!!! todo: it validates authorization as appropriate for each requested channel
      const sendUpdate = (...messages) => {
        for (const json of messages) {
          const update = JSON.stringify(json);
          res.write(update + "\n");
        }
        res.flush();
        //! flushes writes through compression middleware
      };
      const myStreamListeners = [];
      const timerInterval = 7e3;
      //! it sends heartbeat signals every so often to clients
      //!!! todo: heartbeat interval can be configured
      const timer = setInterval(() => {
        this.log("server: client <- heartbeat");
        sendUpdate({ type: "heartbeat" });
      }, timerInterval);
      timer.unref();
      //! the heartbeat-timer never blocks the process from exiting when it's otherwise done
      //! it tells clients how frequently they should expect a heartbeat
      sendUpdate({ type: "heartbeat-info", timerInterval });
      const cleanup = () => {
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
      const notifyConsumeError = (channel, consumeError) => {
        if (!cancelled) {
          sendUpdate({
            channel,
            type: "error",
            message: "internal stream consumer failed",
            reason: consumeError.message
          });
          this.logger.error(`${channel} consume error; TODO: reconnect/retry`, consumeError);
          cleanup();
          next();
        }
      };
      let anySuccesses = 0;
      let warnings = [];
      for (const sub of subscriptions) {
        const { channel } = sub;
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
        const subscriber = await this.listenOneChannel(sub, sendUpdate, notifyConsumeError);
        myStreamListeners.push({ channel, stream: subscriber });
        if (subscriber) anySuccesses += 1;
      }
      if (!anySuccesses) {
        res.status(404).json({ error: "no valid subscriptions in request" });
        return cancel();
      } else if (warnings.length) {
        sendUpdate.apply(this, warnings);
      }
    });
    this.args = args;
    debugger;
    const loggerName = `dred\u2039${serverId}\u203A`;
    this.logger = utils.zonedLogger(loggerName, {
      serverId,
      levels: {
        [loggerName]: logging ? "info" : "warn",
        _message: `(env LOGGING=${logging})`
      }
    });
    this.serverId = serverId;
    this.discovery = DredClient.resolveDiscovery(args);
    this.log(`+server '${serverId}'`, this.discovery, null, 2);
    this.api = this.createExpressServer();
    const redisUrl = this.redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
    this.listener = null;
    this.verifier = new StringNacl(void 0, this);
    this.producers = /* @__PURE__ */ new Map();
    this.subscribers = /* @__PURE__ */ new Map();
    this.redisDb = redisDb || 0;
    this.setupRedis(redisUrl);
    this.setupReplication();
    this.clientArgs = args;
    this.setupExpressHandlers();
  }
  get nbh() {
    return this.args.neighborhood;
  }
  setupExpressHandlers() {
    this.api.use(compression());
    this.api.use((req, res, next) => {
      res.locals.startTime = (/* @__PURE__ */ new Date()).getTime();
      this.log(`-> ${req.method} ${req.originalUrl}`);
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
    this.api.use(this.resultLogger);
  }
  setupRedis(url) {
    if (this.redis) throw new Error(`redis connection is already set up`);
    //!!! todo: use configured Redis connection details
    this.log(`Setting up Redis connection: ${url || "default"}, db: ${this.redisDb}`);
    const options = {
      db: this.redisDb
      // keyPrefix: `${this.nbh}::`  //!!! todo vet this technique.
    };
    if (url) {
      this.redis = new Redis.Redis(url, options);
    } else {
      this.redis = new Redis.Redis(options);
    }
    this.channelList = new RedisHash(
      this.redis,
      "channels",
      StringValueAdapter
    );
    this.channelOptions = new RedisHash(this.redis, "channelOptions", optionsSerializer);
    //!!! todo: allows the application name to override 'dred' setting in channel names created in Redis
    this.channelConn = new RedisChannels({
      application: `${this.nbh}::`,
      redis: {
        url,
        db: this.redisDb
      }
    });
    this.channelConn._log = this.logger;
    this.ensureDefaultChannels();
  }
  //! it has a mockable function for starting the express server
  createExpressServer() {
    return this.args.api || express();
  }
  async pendingSetup() {
    return this.setupPending;
  }
  //!!! todo: once for each nbh
  ensureDefaultChannels() {
    if (this.setupPending) return this.setupPending;
    return this.setupPending = new Promise(async (res) => {
      await this.doChannelSetup("_chans");
      await this.doChannelSetup("_auth");
      await this.doChannelSetup("news");
      await this.doChannelSetup("discussion");
      this.setupPending = void 0;
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
        this.logger.warn("ignoring continuing channel setup for %s while racing with a subsequent reset!");
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
    await streams.produce(stream, "first event in this channel", { type: "channel:genesis" });
    const o = { channelId: channel, ...options };
    this.channelCreated(channel, o);
  }
  //
  async listen() {
    await this.setupPending;
    const myInfo = this.myServerInfo = this.myServerInfo || await this.discovery.myServerInfo(this.serverId);
    if (!myInfo) throw new Error(`can't identify my own info`);
    const { port, address } = myInfo;
    this.listener = this.api.listen(port, address);
    this.log(`server '${this.serverId}' listening at ${address}:${port}`);
    return this.listener;
  }
  async reset(reconnect, finalCleanup) {
    await this.channelConn.cleanup().catch(warning.bind(this, "channelConn.cleanup()"));
    finalCleanup?.(this.redis);
    this.resetting = true;
    await this.redis?.quit().catch(warning.bind(this, "redis.quit()"));
    this.redis?.removeAllListeners();
    this.channelConn = void 0;
    this.redis = void 0;
    const doReconnect = reconnect ?? true;
    if (doReconnect) {
      this.setupRedis(this.redisUrl);
      this.resetting = false;
      return this.setupPending;
    }
    function warning(activityName) {
      return (e) => {
        this.warn(`during close: error in ${activityName}:
	`, e.message || e);
      };
    }
  }
  async close() {
    this.cancelSubscribers();
    this.reset(false);
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
  mkClient(serverSelection, clientArgs = {}) {
    const discovery = clientArgs.discovery ?? this.clientArgs.discovery;
    if (!discovery) throw new Error("discovery is required");
    const oneHost = discovery.hosts.find((h) => h.serverId === serverSelection);
    if (!oneHost) {
      this.logger.error(`server ${serverSelection} not found in discovery`, discovery);
      throw new Error(`server ${serverSelection} not found in discovery`);
    }
    const singleDiscovery = new StaticHostDiscovery({
      hosts: [oneHost]
    });
    return new DredClient({
      name: `${serverSelection || ""}-${clientIndex++}`,
      ...this.clientArgs,
      ...clientArgs,
      discovery: singleDiscovery
    });
  }
  log(a1, ...args) {
    this.logger.info(a1, ...args);
  }
  warn(a1, ...args) {
    this.logger.warn(a1, ...args);
  }
  async channelCreated(channel, options) {
    //! it allows specific subclass of dred server to be notified of channel-creation
    const streams = this.channelConn;
    const chans = await streams.use("_chans");
    this.log("channelCreated", channel, options);
    //! it emits a channel-created event in the _chans meta-channel.
    await streams.produce(chans, "a channel was created", {
      type: "chanCreated",
      channel,
      options: JSON.stringify(options)
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
  async listenOneChannel(sub, sendUpdate, notifyConsumerError) {
    //! it leverages the redis-streams module's cache of per-channel connections
    const channelStream = await this.channelConn.use(sub.channel);
    await this.channelConn.subscribe(channelStream);
    //! it spawns asynchronous monitoring in each channel
    this.monitorChannelChanges(channelStream, sub, sendUpdate, notifyConsumerError);
    return channelStream;
  }
  async monitorChannelChanges(channelStream, sub, sendUpdate, notifyConsumerError) {
    try {
      for await (const events of this.channelConn.consume(
        channelStream,
        "all",
        10,
        this.subscribeTimeout
      )) {
        for (const e of events) {
          const { id: mid, ocid, type, data, ...meta } = e;
          this.log(
            bgBlueBright(black(bold(`    <- ocid ${ocid} in ${sub.channel}: `))),
            e.data.length,
            "bytes"
          );
          debugger;
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
      notifyConsumerError(sub.channel, consumeError);
    }
  }
  setupReplication() {
    if (!this.redis) {
      this.warn("Cannot setup replication: Redis not initialized");
      return;
    }
    this.log(`Setting up message replication for server ${this.serverId}`);
    this.discovery.getHostList().then((hosts) => {
      const otherHosts = hosts.filter((host) => host.serverId !== this.serverId);
      if (otherHosts.length === 0) {
        this.log(`No other hosts found for replication`);
        return;
      }
      this.log(`Found ${otherHosts.length} other hosts for replication`);
      for (const host of otherHosts) {
        try {
          const peerClient = this.mkClient(host.serverId);
          peerClient.subscribeToChannels({
            "*": async (message) => {
              try {
                if (message.sourceServer === this.serverId) {
                  this.log(`Replication: skipping our own message from ${host.serverId}`);
                  return;
                }
                this.log(`Replication: received message on channel ${message.channel || "*"} from peer ${host.serverId}`);
                if (message.type === "channel:genesis") {
                  const channel = message.channel;
                  this.log(`Replication: channel ${channel} created on peer ${host.serverId}`);
                  try {
                    const exists = await this.channelList.has(channel);
                    if (!exists) {
                      await this.channelList.set(channel, "1");
                      this.log(`Replication: created local channel ${channel} from peer ${host.serverId}`);
                    }
                  } catch (err) {
                    this.warn(`Replication: Failed to create local channel ${channel}: ${err}`);
                  }
                } else if (message.msg) {
                  try {
                    const targetChannel = message.channel || "*";
                    const producer = await this.mkChannelProducer(targetChannel);
                    const { msg, type, ocid, sourceServer, ...otherDetails } = message;
                    const messageDetails = {
                      type: type || "replicated",
                      ocid: ocid || `repl-${Date.now()}`,
                      sourceServer: sourceServer || host.serverId,
                      ...otherDetails
                    };
                    await this.channelConn.produce(producer, msg, messageDetails);
                    this.log(`Replication: replicated message to channel ${targetChannel}`);
                  } catch (err) {
                    this.warn(`Replication: Failed to replicate message to channel ${message.channel || "*"}: ${err}`);
                  }
                }
              } catch (err) {
                this.warn(`Replication: Error processing message from ${host.serverId}: ${err}`);
              }
            }
          });
          this.log(`Replication: setup for peer server ${host.serverId} complete`);
        } catch (err) {
          this.warn(`Replication: Failed to set up connection to peer ${host.serverId}: ${err}`);
        }
      }
    }).catch((err) => {
      this.warn(`Failed to get host list for replication: ${err}`);
    });
  }
}
async function createServer(options, serverId, serverDb) {
  const server = new DredServer(options, serverId, serverDb);
  const { api, redis } = server;
  api.set("redis", redis);
  api.use(express.json({}));
  new RedisSet(redis);
  return server;
}

exports.DredServer = DredServer;
exports.createServer = createServer;
//# sourceMappingURL=dred-server.js.map
