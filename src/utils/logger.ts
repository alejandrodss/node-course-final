import winston from 'winston';
import 'dotenv/config';

export default class Logger extends winston.Logger {
  private static instance: Logger;

  private constructor() {
    super();
  }

  static getInstance(): Logger {
    if(!Logger.instance) {
      Logger.instance = winston.createLogger({
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        format: winston.format.json(),
        transports: [
          new winston.transports.Console()
        ]
      });
    }
    return Logger.instance;
  }
}
