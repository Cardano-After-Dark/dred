// ============================================================================|
/*
 * Project : HEARIT
 *
 * Developing an innovative connected/smart home intelligent
 * management system for the needs of blind or visually impaired
 * persons.
 *
 * The project has received funding from the European Regional
 * Development Fund through the Operational Program
 * "Innovation and Competitiveness"
 *
 * Purpose:
 *
 * Pre-sharded channels implementation based on Redis streams.
 *
 * Author: hearit.io
 *
 * API:
 *
 * use, susbscribe, unsubscribe, produce, consume, delete and cleanup
 *
 * License:
 *
 * MIT License
 *
 */
// ============================================================================|
"use strict";

//!!! todo: update ioredis dependency to a more recent version

import { v4 as uuidv4 } from 'uuid';
import Redis from "ioredis";
import * as abstractLoggingInterface from "abstract-logging";

import {
    opt,
    sep,
    pre,
    tun,
    msg,
    origin,
    shards,
    context,
    overflowStreamElemNumber,
    blockStreamConsumerTimeOutMs,
    maxMessageStreamConsumePerRun,
    defaultSchema,
    defaultAppName,
    defaultVersion,
    defaultSlotsNumb,
    defaultOriginType,
} from "./constants.js";

import  { RedisChannelsError }  from "./errors";

function redisFieldsToHash(a) {
    //! converts a flat list of keys into a hash of the keys & primitive values.
    const result = {};
    for (let i = 0; i < a.length; i += 2) {
        result[a[i]] = a[i + 1];
    }
    return result;
}
function hashToRedisFields(h) {
    // converts a hash into a flat list of keys and primitive values
    const r = [];
    for (const [k, v] of Object.entries(h)) {
        r.push(k, v);
    }
    return r;
}

/*
 * Usage example:
 *
 * const {RedisChannels} = require('@hearit-io/redis-channel')
 * const channels = new RedisChannels()
 * const tunnel = await channels.use('group')
 * await channels.subscribe(tunnel)
 *
 * async function process(tunnel) {
 *   for await (const messages of channels.consume(tunnel)) {
 *     for (const i in messages) {
 *       console.log(messages[i]);
 *     }
 *   }
 * }
 *
 * process(tunnel).catch((error) => {
 *   console.error(error);
 * });
 *
 * await channels.produce(tunnel, 'message')
 * await channels.unsubscribe(tunnel)
 *
 * await channels.delete('group')
 * await channels.cleanup()
 */
// ----------------------------------------------------------------------------|
export class RedisChannels {
    constructor(options = {}) {
        let { channels, redis } = options;
        channels = channels || {};

        this._nonBlockRedisClient = this._createRedisClient(redis);

        this._consumers = {};

        this._workInTeam = false;
        this._consumerIsGennerated = true;

        if (typeof channels[opt.LOG] === "undefined") {
            this._log = { ...abstractLoggingInterface }
        } else {
            this._log = channels[opt.LOG];
        }

        if (
            typeof channels[opt.OVERFLOW] === "undefined" ||
            Number.isInteger(channels[opt.OVERFLOW]) === false
        ) {
            this._overflow = overflowStreamElemNumber;
        } else {
            this._overflow = channels[opt.OVERFLOW];
        }

        if (typeof channels[opt.SLOTS] === "undefined") {
            this._slots = defaultSlotsNumb;
        } else {
            if (channels[opt.SLOTS] !== 32 && channels[opt.SLOTS] !== 64) {
                throw new RedisChannelsError(
                    "Invalid shards: " +
                        channels[opt.SLOTS] +
                        "allowed values are 32 or 64."
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
            this._keyHash =
                this._prefix +
                sep.HASH +
                pre.KEYS +
                shards[this._slots][0] +
                sep.OPEN +
                0 +
                sep.CLOSE;

            this._keyZset =
                this._prefix +
                sep.INDEX +
                pre.SHARDS +
                shards[this._slots][0] +
                sep.OPEN +
                0 +
                sep.CLOSE;
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
                    [tun.KEY]: this._prefix + sep.STREAM + group,
                };
            }

            let keyStream = await this._nonBlockRedisClient.hget([
                this._keyHash,
                group,
            ]);

            // We have already the mapping group to sharded stream key.
            if (keyStream !== null) {
                return {
                    [tun.KEY]: keyStream,
                };
            }

            // We need to check the shards score.
            let shard = await this._nonBlockRedisClient.zrangebyscore([
                this._keyZset,
                "-inf",
                "+inf",
                "WITHSCORES",
                "LIMIT",
                "0",
                "1",
            ]);

            // We must initialize the shards.
            if (shard.length === 0) {
                await this._initShardScores();
                shard = await this._nonBlockRedisClient.zrangebyscore([
                    this._keyZset,
                    "-inf",
                    "+inf",
                    "WITHSCORES",
                    "LIMIT",
                    "0",
                    "1",
                ]);
            }

            const [set] = shard;
            keyStream =
                this._prefix +
                sep.STREAM +
                shards[this._slots][set] +
                group +
                sep.OPEN +
                set +
                sep.CLOSE;

            await this._nonBlockRedisClient.hset([
                this._keyHash,
                group,
                keyStream,
            ]);

            await this._nonBlockRedisClient.zincrby([this._keyZset, 1, set]);

            return {[tun.KEY]: keyStream };
        } catch (error) {
            this._log.error("Use error: %o", error);
            throw new RedisChannelsError(
                "Can not call use for a group : " +
                    group +
                    " with sharded mode = " +
                    this._sharded,
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
                // Unsubscribe all related consumers
                for (const i in this._consumers) {
                    if (this._consumers[i][tun.KEY] === keyStream) {
                        await this.unsubscribe(this._consumers[i]);
                    }
                }
                await this._nonBlockRedisClient.del([
                    this._prefix + sep.STREAM + group,
                ]);
                return;
            }

            keyStream = await this._nonBlockRedisClient.hget([
                this._keyHash,
                group,
            ]);

            // Unsubscribe all related consumers
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
                "Can not delete  a group : " +
                    group +
                    " with sharded mode = " +
                    this._sharded,
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
            if (
                typeof tunnel === "undefined" ||
                typeof tunnel[tun.KEY] === "undefined"
            ) {
                throw new RedisChannelsError(
                    "Can not subscribe, no valid tunnel object"
                );
            }
            if (typeof consumer === "undefined") {
                tunnel[tun.CONSUMER] = uuidv4().replace(/-/g, "");
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

            // Tries to create a consumer group and a stream if not exists.
            try {
                // We need to create a stream even we do not need a group.
                await this._nonBlockRedisClient.xgroup([
                    "CREATE",
                    tunnel[tun.KEY],
                    tunnel[tun.TEAM],
                    "$",
                    "MKSTREAM",
                ]);
                await this._deleteRedisConsumerAndGroup(tunnel);
            } catch {}

            // Creates a redis client if necessery.
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
            if (
                typeof tunnel === "undefined" ||
                typeof tunnel[tun.TEAM] === "undefined" ||
                typeof tunnel[tun.CONSUMER] === "undefined"
            ) {
                throw new RedisChannelsError(
                    "Can not unsubscribe, no valid tunnel object"
                );
            }
            const { [tun.TEAM]: team, [tun.CONSUMER]: consumer } = tunnel;

            const fields = {
                _action: "unsubscribe",
                _team: team,
                _consumer: consumer,
            };
            const f = hashToRedisFields(fields)
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
    async produce(
        tunnel,
        message,
        { _type = defaultOriginType, ...appFields } = {}
    ) {

        try {
            const data = message;
            const redisFields = hashToRedisFields({
                _type: _type,
                _data: data,
                ...appFields,
            });
            const id = await this._nonBlockRedisClient.xadd([
                tunnel[tun.KEY],
                "MAXLEN",
                "~",
                this._overflow,
                "*",
                ...redisFields,
            ]);
            return id;
        } catch (error) {
            this._log.error("Produce error:", error.stack || error.message || JSON.stringify(error));
            debugger
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

    async *consume(
        tunnel,
        targetType = defaultOriginType,
        count = maxMessageStreamConsumePerRun,
        timeout = blockStreamConsumerTimeOutMs,
        fromId = ">",
        messageOnTimeOut = false
    ) {
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
                    data = await this._consumers[tunnel[tun.CONSUMER]][
                        tun.CONNECTION
                    ].xread([
                        "COUNT",
                        count,
                        "BLOCK",
                        timeout,
                        "STREAMS",
                        tunnel[tun.KEY],
                        currentId,
                    ]);
                } else {
                    data = await this._consumers[tunnel[tun.CONSUMER]][
                        tun.CONNECTION
                    ].xreadgroup([
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
                        currentId,
                    ]);
                }
                // We have a time out
                if (data === null) {
                    // If we are using XREAD we should check if the stream exist.
                    // Otherwise a consumer will not finish after a delete stream
                    // operation and a timeout.
                    if (this._workInTeam === false) {
                        await this._consumers[tunnel[tun.CONSUMER]][
                            tun.CONNECTION
                        ].xinfo(["STREAM", tunnel[tun.KEY]]);
                    }
                    if (messageOnTimeOut) {
                        result.push({
                            [msg.ID]: lastId,
                            [msg.DATA]: null,
                        });
                        yield result;
                    }
                    continue;
                }

                /*
        // Relevant for a calls with a xreadgroup
        if (data[0][1].length === 0 && this._workInTeam) {
          pendingEntries = false
          currentId = '>'
        }
        */

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

                        const unsubscribe = ("unsubscribe" === _action);
                        if (_action && !unsubscribe) throw new Error(`bad _action value in message`);
                        if (_team && !unsubscribe) throw new Error(`_team is only valid for _action=unsubscribe messages`);
                        if (_consumer && !unsubscribe) throw new Error(`_consumer is only valid for _action=unsubscribe messages`);

                        if (this._workInTeam === false) {
                            currentId = id;
                        }
                        /*
              if (pendingEntries) {
                currentId = id
              }
              */

                        //!!! todo: convert to typescript
                        // --------------------------------------------------------------------------|
                        if (!unsubscribe && _type === targetType) {
                            result.push({ id, data:_data, ...appAttrs });
                            lastId = id;
                        } else if (unsubscribe) {
                            if (
                                _team === tunnel.team &&
                                _consumer === tunnel.consumer
                            ) {
                                // Delete a unsubscribe message with a common nonblocking
                                // Redis client.
                                // Multiple unsubscribe messages are possible
                                // for the same consumer and a team!!!
                                await this._nonBlockRedisClient.xdel(
                                    [tunnel.key],
                                    id
                                );

                                if (!unsubscribing) {
                                    // Cleanup a redis consumer and a group
                                    await this._deleteRedisConsumerAndGroup(
                                        tunnel
                                    );
                                    unsubscribing = true;
                                }
                            } else {
                                // Create a message with an unsubscribe context for the right
                                // consumer (only in a team work case).
                                if (this._workInTeam) {
                                    await this.unsubscribe({
                                        team: _team,
                                        consumer: _consumer,
                                        key: tunnel.key,
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
                "Can not consume from the tunnel: " +
                    tunnel[tun.KEY] +
                    " " +
                    tunnel[tun.CONSUMER],
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
            // Deletes a consumer and a consumer group
            if (this._workInTeam === false || force) {
                await this._nonBlockRedisClient.xgroup([
                    "DELCONSUMER",
                    tunnel[tun.KEY],
                    tunnel[tun.TEAM],
                    tunnel[tun.CONSUMER],
                ]);

                // Deletes a consumer group
                const teams = await this._nonBlockRedisClient.xinfo([
                    "GROUPS",
                    tunnel[tun.KEY],
                ]);
                for (const i in teams) {
                    // We can not rely on fields exact positions - according to
                    // https://redis.io/commands/xinfo.
                    const k = teams[i].indexOf("name");
                    if (k < 0 || teams[i][k + 1] !== tunnel[tun.TEAM]) {
                        continue;
                    }
                    const j = teams[i].indexOf("consumers");
                    if (j >= 0 && teams[i][j + 1] === 0) {
                        await this._nonBlockRedisClient.xgroup([
                            "DESTROY",
                            tunnel[tun.KEY],
                            tunnel[tun.TEAM],
                        ]);
                    }
                    break;
                }
            }
        } catch {}
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
            // We have a Cluster instance
            redis = new Redis.Cluster(nodes, options);
        } else {
            // We have a Redis instance
            if (url) {
                redis = new Redis(url, options);
            } else {
                redis = new Redis(options);
            }
        }

        redis.addListener("error", () => {
            // Disable all errors.
        });
        return redis;
    }

    // --------------------------------------------------------------------------|
    _duplicateRedisClient() {
        const redis = this._nonBlockRedisClient.duplicate();
        redis.addListener("error", () => {
            // Disable all errors.
        });
        return redis;
    }
}

