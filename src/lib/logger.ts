import expressWinston from 'express-winston';
import winston, { format, transports } from 'winston';
const customLevels = {
  levels: {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warning: 4,
    notice: 5,
    info: 6,
    debug: 7,
  },
  colors: {
    emerg: 'red',
    alert: 'yellow',
    crit: 'red',
    error: 'red',
    warning: 'yellow',
    notice: 'bold cyanBG',
    info: 'green',
    debug: 'cyan',
  },
};

// Add custom colors
winston.addColors(customLevels.colors);

// Create logger
export const logger = winston.createLogger({
  levels: customLevels.levels,
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info', // Default log level
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message, stack }) => {
      return `${level}: ${timestamp}  ${message}${stack ? '\n' + stack : ''}`;
    })
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({ timestamp, level, message, stack }) => {
          return `${level}: ${timestamp}  ${message}${stack ? '\n' + stack : ''}`;
        })
      ),
    }),
  ],
  exitOnError: false,
  silent: false,
});

// Express logging middleware
export const loggingMiddleware = expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.printf((info) => `${info.level}: ${info.message}`)
  ),
  meta: false,
  msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
  expressFormat: true,
  colorize: true,
  statusLevels: true,
});
