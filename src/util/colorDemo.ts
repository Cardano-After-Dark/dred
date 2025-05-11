/**
 * Demo for the colors utility
 * Run with: npx ts-node src/util/colorDemo.ts
 */

import colors, { LogLevel } from './colors.js';

// Basic color examples
console.log('\nBasic colors:');
console.log(colors.red('This text is red'));
console.log(colors.green('This text is green'));
console.log(colors.blue('This text is blue'));
console.log(colors.yellow('This text is yellow'));

// Style examples
console.log('\nText styles:');
console.log(colors.bold('This text is bold'));
console.log(colors.dim('This text is dim'));
console.log(colors.italic('This text is italic'));
console.log(colors.underline('This text is underlined'));

// Background colors
console.log('\nBackground colors:');
console.log(colors.bgRed('  Red background  '));
console.log(colors.bgBlue(colors.white('  Blue background with white text  ')));

// Combining styles
console.log('\nCombining styles:');
console.log(colors.bold(colors.green('Bold green text')));
console.log(colors.bgYellow(colors.black('Black text on yellow background')));

// Structured log examples
console.log('\nStructured logs:');
console.log(colors.log('This is a normal info message'));
console.log(colors.log('Debug message with low importance', LogLevel.DEBUG));
console.log(colors.log('Warning: Something might be wrong', LogLevel.WARN));
console.log(colors.log('Error: Something is definitely wrong', LogLevel.ERROR));
console.log(colors.log('Success: Operation completed', LogLevel.SUCCESS));

// With caller information
console.log('\nLogs with caller:');
console.log(colors.log('Message from UserService', LogLevel.INFO, 'UserService'));
console.log(colors.log('Database connection failed', LogLevel.ERROR, 'DbConnector'));

// Decorative elements
console.log('\nDecorative elements:');
console.log(colors.line('-', 40, colors.cyan));
console.log(colors.line('=', 40, colors.yellow));

// Box around text
console.log('\nBox around text:');
console.log(colors.box('DRED Server\nVersion 0.0.1', 2, colors.green));

// Highlight important information
console.log('\nHighlight example:');
console.log(`Status: ${colors.highlight('ONLINE')}`);
console.log(`Users connected: ${colors.highlight('42')}`);

// Timestamp
console.log('\nTimestamp example:');
console.log(`${colors.timestamp()} Server started`); 