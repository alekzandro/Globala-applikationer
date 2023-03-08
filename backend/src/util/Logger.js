const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    label({ label: 'MyApp' }),
    timestamp(),
    myFormat
  ),
  transports: [new transports.Console()]
});

class Logger {
  // Logs error to console and throws appropriate HTTP error
  logError(err, statusCode) {
    const errName = err.name || 'Undefined name';
    const errMsg = err.message || 'Undefined message';

    logger.info(`Error: ${errName} \nMessage: ${errMsg}`);

    switch (statusCode) {
      case 404:
        throw new Error('Not found');
      case 500:
        throw new Error('Internal server error');
      case 505:
        throw new Error('HTTP Version Not Supported');
      case 503:
        throw new Error('Service Unavailable');
      default:
        break;
    }
  }
}

module.exports = { Logger };
