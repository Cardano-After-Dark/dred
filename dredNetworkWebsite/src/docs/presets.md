# Presets

Dred comes with several pre-configured presets to help you get started quickly with common use cases.

## Available Presets

### Basic Preset

The basic preset provides a simple configuration for getting started:

```js
// dred.preset.basic.js
export default {
    mode: 'development',
    maxConnections: 100,
    timeout: 30000,
    retryAttempts: 3,
    logging: {
        level: 'info',
        format: 'simple'
    }
}
```

### Production Preset

Optimized for production environments:

```js
// dred.preset.production.js
export default {
    mode: 'production',
    maxConnections: 1000,
    timeout: 5000,
    retryAttempts: 5,
    logging: {
        level: 'warn',
        format: 'json'
    },
    security: {
        rateLimit: true,
        maxRequestsPerMinute: 100
    }
}
```

### High Performance Preset

For applications requiring high throughput:

```js
// dred.preset.highperf.js
export default {
    mode: 'production',
    maxConnections: 5000,
    timeout: 3000,
    retryAttempts: 3,
    logging: {
        level: 'error',
        format: 'json'
    },
    performance: {
        enableCaching: true,
        cacheSize: '1gb',
        workerThreads: 4
    }
}
```

## Using Presets

To use a preset, specify it in your `dred.config.js`:

```js
import basicPreset from '@dred/preset-basic'

export default {
    ...basicPreset,
    // Override specific settings
    serverId: 'your-server-id',
    neighborhoods: ['your-neighborhood']
}
```

## Customizing Presets

You can extend any preset with your own settings:

```js
import productionPreset from '@dred/preset-production'

export default {
    ...productionPreset,
    logging: {
        ...productionPreset.logging,
        level: 'debug'
    },
    // Add custom settings
    custom: {
        feature: true,
        option: 'value'
    }
}
```

## Best Practices

- Start with the basic preset during development
- Use the production preset for deployment
- Consider the high performance preset for large-scale applications
- Always test your configuration in a staging environment first
- Monitor your application's performance after applying presets

## Next Steps

- Check out our [Configuration Guide](./configuration) for detailed settings
- Learn about [Performance Tuning](./performance)
- See [Examples](./examples) of preset usage in different scenarios 