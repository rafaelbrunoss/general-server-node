import { injectable } from 'inversify';

import type { ILogger } from '@common/infrastructure/logger';
import type { IScheduler } from '@common/infrastructure/scheduler';

@injectable()
export class Scheduler implements IScheduler {
  constructor(private readonly logger: ILogger) {}

  public async initialize(): Promise<void> {
    this.logger.info(`[Starting jobs of the scheduler]`);
  }
}
