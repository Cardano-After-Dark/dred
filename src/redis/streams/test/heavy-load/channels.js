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
* Implements asynchronious run of producer/consumer methods for testing
* purposes.
*
* Author: hearit.io
*
* License:
*
* MIT License
*
*/
// ============================================================================|
'use strict'

const { RedisChannels } = require('../../')
const { sleep, getRedisOptions } = require('../util')

// A message with about 4000 bytes.
const data = `
00000000000000000000000000000000000000000000000000000000000000000000000000000000
11111111111111111111111111111111111111111111111111111111111111111111111111111111
22222222222222222222222222222222222222222222222222222222222222222222222222222222
33333333333333333333333333333333333333333333333333333333333333333333333333333333
44444444444444444444444444444444444444444444444444444444444444444444444444444444
55555555555555555555555555555555555555555555555555555555555555555555555555555555
66666666666666666666666666666666666666666666666666666666666666666666666666666666
88888888888888888888888888888888888888888888888888888888888888888888888888888888
99999999999999999999999999999999999999999999999999999999999999999999999999999999
99999999999999999999999999999999999999999999999999999999999999999999999999999999
00000000000000000000000000000000000000000000000000000000000000000000000000000000
11111111111111111111111111111111111111111111111111111111111111111111111111111111
22222222222222222222222222222222222222222222222222222222222222222222222222222222
33333333333333333333333333333333333333333333333333333333333333333333333333333333
44444444444444444444444444444444444444444444444444444444444444444444444444444444
55555555555555555555555555555555555555555555555555555555555555555555555555555555
66666666666666666666666666666666666666666666666666666666666666666666666666666666
88888888888888888888888888888888888888888888888888888888888888888888888888888888
99999999999999999999999999999999999999999999999999999999999999999999999999999999
99999999999999999999999999999999999999999999999999999999999999999999999999999999
00000000000000000000000000000000000000000000000000000000000000000000000000000000
11111111111111111111111111111111111111111111111111111111111111111111111111111111
22222222222222222222222222222222222222222222222222222222222222222222222222222222
33333333333333333333333333333333333333333333333333333333333333333333333333333333
44444444444444444444444444444444444444444444444444444444444444444444444444444444
55555555555555555555555555555555555555555555555555555555555555555555555555555555
66666666666666666666666666666666666666666666666666666666666666666666666666666666
88888888888888888888888888888888888888888888888888888888888888888888888888888888
99999999999999999999999999999999999999999999999999999999999999999999999999999999
99999999999999999999999999999999999999999999999999999999999999999999999999999999
00000000000000000000000000000000000000000000000000000000000000000000000000000000
11111111111111111111111111111111111111111111111111111111111111111111111111111111
22222222222222222222222222222222222222222222222222222222222222222222222222222222
33333333333333333333333333333333333333333333333333333333333333333333333333333333
44444444444444444444444444444444444444444444444444444444444444444444444444444444
55555555555555555555555555555555555555555555555555555555555555555555555555555555
66666666666666666666666666666666666666666666666666666666666666666666666666666666
88888888888888888888888888888888888888888888888888888888888888888888888888888888
99999999999999999999999999999999999999999999999999999999999999999999999999999999
99999999999999999999999999999999999999999999999999999999999999999999999999999999
00000000000000000000000000000000000000000000000000000000000000000000000000000000
11111111111111111111111111111111111111111111111111111111111111111111111111111111
22222222222222222222222222222222222222222222222222222222222222222222222222222222
33333333333333333333333333333333333333333333333333333333333333333333333333333333
44444444444444444444444444444444444444444444444444444444444444444444444444444444
55555555555555555555555555555555555555555555555555555555555555555555555555555555
66666666666666666666666666666666666666666666666666666666666666666666666666666666
88888888888888888888888888888888888888888888888888888888888888888888888888888888
99999999999999999999999999999999999999999999999999999999999999999999999999999999
99999999999999999999999999999999999999999999999999999999999999999999999999999999
`

class TestError extends Error {
  constructor (message, error = null) {
    super(message)
    this.error = error
    Error.captureStackTrace(this, TestError)
  }
}

async function consume (number, channels, tunnel,
  numberOfMessagesToProducePerGroup, tap) {
  try {
    let k = 0
    for await (const messages of channels.consume(tunnel)) {
      for (const i in messages) {
        const message = JSON.parse(messages[i].data)
        if (message.number !== k) {
          throw new Error('Consumer ' + tunnel.consumer +
            ' expeced : ' + k + ', got ' + message.number)
        }
        const test = 'Consume on ' + tunnel.consumer + ', message : ' + k
        tap.pass(test)
        k = k + 1
        if (k === numberOfMessagesToProducePerGroup) {
          await channels.unsubscribe(tunnel)
        }
      }
    }
    return (-1) * k
  } catch (error) {
    console.error('consume error : ', error)
    // throw new TestError(number, error)
  }
}

// ----------------------------------------------------------------------------|
async function produce (number, channels, tunnel,
  numberOfMessagesToProducePerGroup, tap) {
  try {
    for (let i = 0; i < numberOfMessagesToProducePerGroup; i++) {
      const message = { number: i, data: data }
      await channels.produce(tunnel, JSON.stringify(message))
      const test = 'Produced in stream ' + tunnel.key + ', message : ' + i
      tap.pass(test)
    }
    return numberOfMessagesToProducePerGroup
  } catch (error) {
    console.error('produce error : ', error)
    // throw new TestError(number, error)
  }
}

/*
* The test function
*/
// ----------------------------------------------------------------------------|
module.exports = async function (core, tap, application, version,
  groupName, numberOfGroups, numberOfConsumersPerGroup,
  numberOfMessagesToProducePerGroup, sharded) {
  numberOfMessagesToProducePerGroup =
    parseInt(numberOfMessagesToProducePerGroup)
  try {
    // Create a channel
    const channelsOptions = {
      application: application, version: version, sharded: sharded
    }
    const redisOptions = getRedisOptions()
    const channels = new RedisChannels({
      channels: channelsOptions,
      redis: redisOptions
    })

    // Create tunnels
    const tunnels = []
    const groups = []
    for (let g = 0; g < numberOfGroups; g++) {
      const group = core + '-' + groupName + '-' + g
      for (let i = 0; i < numberOfConsumersPerGroup; i++) {
        tunnels.push(await channels.use(group))
      }
      groups.push(tunnels[tunnels.length - 1])
    }

    // Subscribe consumers
    for (const i in tunnels) {
      await channels.subscribe(tunnels[i])
    }

    // Start consumers
    const promises = []
    for (const i in tunnels) {
      promises.push(consume(core, channels,
        tunnels[i], numberOfMessagesToProducePerGroup, tap))
    }

    // Wait 5 seconds to allow consumers to start
    await sleep(5000)

    // Start producers
    for (const g in groups) {
      promises.push(produce(core, channels, groups[g],
        numberOfMessagesToProducePerGroup, tap))
    }

    /*
    // Subscribe consumers
    for (const i in tunnels) {
      await channels.unsubscribe(tunnels[i])
    }
    */
    return Promise.all(promises)
  } catch (error) {
    throw new TestError(core, error)
  }
}