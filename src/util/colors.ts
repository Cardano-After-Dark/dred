/**
 * Color utility for dred-server logging
 * 
 * This module provides a simple interface for colored console output
 * using the lightweight picocolors library.
 */

import pc from 'picocolors';

/**
 * LogLevel enumeration for different log types
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  SUCCESS = 'success'
}

/**
 * Color configuration for different parts of log messages
 */
const colorConfig = {
  debug: {
    level: pc.gray,
    text: pc.white
  },
  info: {
    level: pc.blue,
    text: pc.white
  },
  warn: {
    level: pc.yellow,
    text: pc.yellow
  },
  error: {
    level: pc.red,
    text: pc.red
  },
  success: {
    level: pc.green,
    text: pc.green
  },
  time: pc.dim,
  caller: pc.magenta,
  highlight: pc.bold,
  dim: pc.dim,
  reset: pc.reset
};

/**
 * Color utilities for formatting text
 */
export const colors = {
  /**
   * Basic color functions from picocolors
   */
  black: pc.black,
  red: pc.red,
  green: pc.green,
  yellow: pc.yellow,
  blue: pc.blue,
  magenta: pc.magenta,
  cyan: pc.cyan,
  white: pc.white,
  gray: pc.gray,
  
  /**
   * Style functions
   */
  bold: pc.bold,
  dim: pc.dim,
  italic: pc.italic,
  underline: pc.underline,
  inverse: pc.inverse,
  hidden: pc.hidden,
  strikethrough: pc.strikethrough,
  reset: pc.reset,
  
  /**
   * Background colors
   */
  bgBlack: pc.bgBlack,
  bgRed: pc.bgRed,
  bgGreen: pc.bgGreen,
  bgYellow: pc.bgYellow,
  bgBlue: pc.bgBlue,
  bgMagenta: pc.bgMagenta,
  bgCyan: pc.bgCyan,
  bgWhite: pc.bgWhite,
  
  /**
   * Format a timestamp for logging
   */
  timestamp: () => {
    const now = new Date();
    return colorConfig.time(
      `[${now.toISOString().replace('T', ' ').slice(0, -5)}]`
    );
  },
  
  /**
   * Format a log level indicator
   */
  level: (level: LogLevel) => {
    const padding = ' '.repeat(Math.max(0, 7 - level.length));
    return colorConfig[level].level(`[${level.toUpperCase()}]${padding}`);
  },
  
  /**
   * Add caller information to logs
   */
  caller: (name: string) => {
    return colorConfig.caller(`[${name}]`);
  },
  
  /**
   * Highlight important text
   */
  highlight: (text: string) => {
    return colorConfig.highlight(text);
  },
  
  /**
   * Format text based on log level
   */
  format: (text: string, level: LogLevel = LogLevel.INFO) => {
    return colorConfig[level].text(text);
  },
  
  /**
   * Colorize an entire log message with appropriate formatting
   */
  log: (message: string, level: LogLevel = LogLevel.INFO, caller?: string) => {
    const timestamp = colors.timestamp();
    const levelStr = colors.level(level);
    const callerStr = caller ? ` ${colors.caller(caller)}` : '';
    const text = colorConfig[level].text(message);
    
    return `${timestamp} ${levelStr}${callerStr} ${text}`;
  },
  
  /**
   * Create separator lines for logs
   */
  line: (char: string = '─', length: number = 80, color?: (s: string) => string) => {
    const line = char.repeat(length);
    return color ? color(line) : line;
  },
  
  /**
   * Create a box around text
   */
  box: (text: string, padding: number = 1, color?: (s: string) => string) => {
    const lines = text.split('\n');
    const maxLength = Math.max(...lines.map(line => line.length));
    const horizontal = '─'.repeat(maxLength + padding * 2);
    
    const top = `┌${horizontal}┐`;
    const bottom = `└${horizontal}┘`;
    const paddingStr = ' '.repeat(padding);
    
    const content = lines.map(line => {
      const spaces = ' '.repeat(maxLength - line.length);
      return `│${paddingStr}${line}${spaces}${paddingStr}│`;
    }).join('\n');
    
    const result = `${top}\n${content}\n${bottom}`;
    return color ? color(result) : result;
  }
};

export default colors; 