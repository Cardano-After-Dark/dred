/**
 * Logger utility for dred-server
 * 
 * Provides a structured and colorful logging system based on the colors utility.
 */

import colors, { LogLevel } from './colors.js';

interface LoggerOptions {
  /** The name of the component or module using the logger */
  name?: string;
  /** Minimum log level to display (defaults to DEBUG) */
  minLevel?: LogLevel;
  /** Whether to display timestamps (defaults to true) */
  showTimestamp?: boolean;
  /** Whether to output to console (defaults to true) */
  console?: boolean;
}

/**
 * Maps LogLevel to console methods
 */
const consoleMethodMap = {
  [LogLevel.DEBUG]: 'debug',
  [LogLevel.INFO]: 'info',
  [LogLevel.WARN]: 'warn',
  [LogLevel.ERROR]: 'error',
  [LogLevel.SUCCESS]: 'info'
} as const;

/**
 * Logger class for consistent, colorful logging
 */
export class Logger {
  private options: Required<LoggerOptions>;
  private static logLevelPriority = {
    [LogLevel.DEBUG]: 0,
    [LogLevel.INFO]: 1,
    [LogLevel.SUCCESS]: 2,
    [LogLevel.WARN]: 3,
    [LogLevel.ERROR]: 4
  };

  /**
   * Create a new Logger instance
   */
  constructor(options: LoggerOptions = {}) {
    this.options = {
      name: options.name || 'App',
      minLevel: options.minLevel || LogLevel.DEBUG,
      showTimestamp: options.showTimestamp !== false,
      console: options.console !== false
    };
  }

  /**
   * Creates a child logger with a different name but inheriting other settings
   */
  child(name: string): Logger {
    return new Logger({
      ...this.options,
      name
    });
  }

  /**
   * Logs a message with the specified level if it meets the minimum level requirement
   */
  private log(message: string | Error, level: LogLevel, ...args: any[]): void {
    // Check if this log level should be shown based on minLevel
    if (Logger.logLevelPriority[level] < Logger.logLevelPriority[this.options.minLevel]) {
      return;
    }

    let msgString = message instanceof Error ? message.stack || message.message : message;
    
    // Format additional arguments if present
    if (args.length > 0) {
      const formattedArgs = args.map(arg => {
        if (typeof arg === 'object') {
          return JSON.stringify(arg, null, 2);
        }
        return String(arg);
      }).join(' ');
      
      msgString = `${msgString} ${formattedArgs}`;
    }

    // Create the colorized log message
    const logMessage = colors.log(msgString, level, this.options.name);
    
    // Output to console if enabled
    if (this.options.console) {
      // @ts-ignore - We know these methods exist on console
      console[consoleMethodMap[level]](logMessage);
    }

    return;
  }

  /**
   * Log a debug message
   */
  debug(message: string | Error, ...args: any[]): void {
    this.log(message, LogLevel.DEBUG, ...args);
  }

  /**
   * Log an info message
   */
  info(message: string | Error, ...args: any[]): void {
    this.log(message, LogLevel.INFO, ...args);
  }

  /**
   * Log a warning message
   */
  warn(message: string | Error, ...args: any[]): void {
    this.log(message, LogLevel.WARN, ...args);
  }

  /**
   * Log an error message
   */
  error(message: string | Error, ...args: any[]): void {
    this.log(message, LogLevel.ERROR, ...args);
  }

  /**
   * Log a success message
   */
  success(message: string | Error, ...args: any[]): void {
    this.log(message, LogLevel.SUCCESS, ...args);
  }

  /**
   * Creates a separator line
   */
  line(char: string = '─', length: number = 80, color?: (s: string) => string): void {
    if (this.options.console) {
      console.log(colors.line(char, length, color));
    }
  }

  /**
   * Creates a styled box around text
   */
  box(text: string, padding: number = 1, color?: (s: string) => string): void {
    if (this.options.console) {
      console.log(colors.box(text, padding, color));
    }
  }

  /**
   * Time an operation and log its duration
   */
  time<T>(name: string, fn: () => T): T {
    this.info(`Starting: ${name}`);
    const start = Date.now();
    try {
      const result = fn();
      const duration = Date.now() - start;
      this.success(`Completed: ${name} (${duration}ms)`);
      return result;
    } catch (error) {
      const duration = Date.now() - start;
      this.error(`Failed: ${name} (${duration}ms)`);
      throw error;
    }
  }

  /**
   * Time an async operation and log its duration
   */
  async timeAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    this.info(`Starting: ${name}`);
    const start = Date.now();
    try {
      const result = await fn();
      const duration = Date.now() - start;
      this.success(`Completed: ${name} (${duration}ms)`);
      return result;
    } catch (error) {
      const duration = Date.now() - start;
      this.error(`Failed: ${name} (${duration}ms)`, error);
      throw error;
    }
  }
}

// Create a default logger instance
export const logger = new Logger();

export default Logger; 