const config = require('config');
const path = require('path');
const winston = require('winston');

const loggingFormat = winston.format.printf((info) => {
  return `${info.level} ${info.timestamp}: ${JSON.stringify(info.message)}`;
});

const options = {
  console: {
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.splat(),
      loggingFormat,
    ),
  },
  file: {
    json: true,
    filename: path.join(__dirname, config.get('logs.path')),
    maxsize: 1000000,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.splat(),
      loggingFormat,
    ),
  },
};

const levelColors = {
  warn: 'yellow',
  error: 'red',
  info: 'green',
};

winston.addColors(levelColors);

const transports = winston.createLogger({
  level: 'info',
  format: winston.format.timestamp(),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
});

const logger = {
  info: (message) => {
    transports.info(message);
  },
  warn: (message, error) => {
    transports.warn(message, error);
  },
  error: (message, error) => {
    transports.error(message, error);
  },
};

module.exports = logger;
