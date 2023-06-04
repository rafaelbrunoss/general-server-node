import { PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';

import type { IOrm } from '@common/infrastructure/database/orm';
import type { ILogger } from '@common/infrastructure/logger';

@injectable()
export class Orm implements IOrm {
  public orm: PrismaClient;

  constructor(private readonly logger: ILogger) {}

  public async initialize(): Promise<void> {
    this.orm = new PrismaClient();

    try {
      // await this.orm.authenticate();
      // await this.orm.sync();
      await this.orm.$connect();
      this.logger.info(`[Connected to the main database]`);
    } catch (error) {
      this.logger.info(`[Unable to connect to the main database:] ${error}`);
    }
  }

  public async close(): Promise<void> {
    await this.orm.$disconnect();
    this.logger.info(`[Disconnected to the main database]`);
  }

  public async healthCheck(): Promise<void> {
    try {
      await this.orm.$queryRaw`SELECT 1`;
    } catch (error) {
      this.logger.info(`[Unable to connect to the main database:] ${error}`);
    }
  }
}
