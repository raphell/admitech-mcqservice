
import dotenv from 'dotenv';
import { createLogger, format, transports } from 'winston';
dotenv.config();

// Logger creation
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: `admitech_mcqservice-${process.env.NODE_ENV}` },
  transports: [
    new transports.File({ filename: 'logs/test.log' })
  ]
});

// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }));
}

export = logger
