/**
 * Demo for the Logger utility
 * Run with: npx ts-node src/util/loggerDemo.ts
 */

import { Logger, logger } from './Logger.js';
import colors, { LogLevel } from './colors.js';

// Use the default logger
logger.line('=', 50, colors.blue);
logger.box('Logger Demo', 2, colors.blue);
logger.line('=', 50, colors.blue);

// Basic logging
logger.debug('This is a debug message');
logger.info('This is an info message');
logger.warn('This is a warning message');
logger.error('This is an error message');
logger.success('This is a success message');

// Logging with objects
logger.info('User data:', { id: 123, name: 'John Doe', active: true });

// Logging with Error objects
try {
  throw new Error('Something went wrong');
} catch (error) {
  logger.error(error as Error);
}

// Create component-specific loggers
const dbLogger = new Logger({ name: 'Database' });
const apiLogger = new Logger({ name: 'API' });
const authLogger = new Logger({ name: 'Auth' });

dbLogger.info('Connected to database');
apiLogger.info('Server started on port 3000');
authLogger.warn('Failed login attempt', { username: 'user123', ip: '192.168.1.1' });

// Using the timing functions
logger.line('-', 50);
logger.info('Demonstrating timing functions:');

// Synchronous timing
const result = logger.time('Synchronous operation', () => {
  // Simulate work
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += i;
  }
  return sum;
});

logger.info(`Operation result: ${result}`);

// Asynchronous timing (self-invoking async function)
(async () => {
  try {
    await logger.timeAsync('Async operation', async () => {
      // Simulate async work
      await new Promise(resolve => setTimeout(resolve, 1500));
      return 'Async operation completed';
    });
    
    // Create a logger with minimum level set to WARN
    logger.line('-', 50);
    logger.info('Creating a logger with minimum level set to WARN:');
    
    const prodLogger = new Logger({ 
      name: 'Production', 
      minLevel: LogLevel.WARN 
    });
    
    // These won't show up
    prodLogger.debug('This debug message will be filtered out');
    prodLogger.info('This info message will be filtered out');
    
    // These will show up
    prodLogger.warn('This warning will be shown');
    prodLogger.error('This error will be shown');
    
    // Child loggers
    logger.line('-', 50);
    logger.info('Demonstrating child loggers:');
    
    const parentLogger = new Logger({ name: 'Parent' });
    const childLogger = parentLogger.child('Child');
    
    parentLogger.info('Message from parent');
    childLogger.info('Message from child');
    
  } catch (error) {
    logger.error('Demo failed', error);
  }
})(); 