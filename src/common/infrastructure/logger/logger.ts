import { injectable } from 'inversify';
import { Format } from 'logform';
import {
  format as winstonFormat,
  Logger as WinstonLogger,
  transports,
  createLogger,
} from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import { NODE_ENV } from '@common/domain/utils';

import { type ILogger } from '@common/infrastructure/logger';

@injectable()
export class Logger implements ILogger {
  private readonly logger: WinstonLogger;
  private readonly format: Format;

  constructor() {
    this.logger = createLogger({
      exitOnError: false,
      level: 'info',
    });
    this.format = winstonFormat.combine(
      winstonFormat.timestamp(),
      winstonFormat.json(),
    );
  }

  public initialize(): void {
    const loggerConfig = {
      datePattern: 'YYYY-MM-DD',
      dirname: '/app/logs',
      format: this.format,
      maxFiles: '14d',
      maxSize: '20m',
      zippedArchive: true,
    };

    this.logger.add(
      new DailyRotateFile({
        filename: 'server-%DATE%.info.log',
        level: 'info',
        ...loggerConfig,
      }),
    );

    this.logger.add(
      new DailyRotateFile({
        filename: 'server-%DATE%.warn.log',
        level: 'warn',
        ...loggerConfig,
      }),
    );

    this.logger.add(
      new DailyRotateFile({
        filename: 'server-%DATE%.error.log',
        level: 'error',
        ...loggerConfig,
      }),
    );

    if (NODE_ENV === 'development') {
      this.logger.add(
        new transports.Console({
          format: winstonFormat.combine(
            winstonFormat.colorize({ all: true }),
            winstonFormat.label({ label: '[LOGGER]' }),
            winstonFormat.timestamp(),
            winstonFormat.printf(
              (info) =>
                `${info.label} ${info.timestamp} [${info.level}] : ${info.message} `,
            ),
          ),
          handleExceptions: true,
          level: 'debug',
        }),
      );
    }
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public error(message: string): void {
    this.logger.error(message);
  }
}
