import { createTerminus } from '@godaddy/terminus';
import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';
import { injectable } from 'inversify';

import { K8S_GRACEFUL_PERIOD_OF_SHUTDOWN } from '@common/domain/utils';

import type { ICacheDatabase } from '@common/infrastructure/cache-database';
import type { IOrm } from '@common/infrastructure/database/orm';
import type { ILogger } from '@common/infrastructure/logger';
import type { IProcessHandler } from '@common/infrastructure/process-handler';
import type { ISearchEngine } from '@common/infrastructure/search-engine';

@injectable()
export class ProcessHandler implements IProcessHandler {
  constructor(
    private readonly logger: ILogger,
    private readonly orm: IOrm,
    private readonly cache: ICacheDatabase,
    private readonly searchEngine: ISearchEngine,
  ) {}

  public async initialize(server: HttpServer | HttpsServer): Promise<void> {
    createTerminus(server, {
      healthChecks: {
        '/_liveness': this.livenessCheck,
        '/_readiness': this.readinessCheck,
      },
      timeout: 5000,
      signals: ['SIGINT', 'SIGTERM'],
      beforeShutdown: this.onBeforeShutDown,
      onSignal: this.onSignalOfShutDown,
      onShutdown: this.onShutDown,
    });
  }

  private async onBeforeShutDown(): Promise<any> {
    return new Promise((resolve) =>
      setTimeout(resolve, Number(K8S_GRACEFUL_PERIOD_OF_SHUTDOWN as string)),
    );
  }

  private async onSignalOfShutDown(): Promise<void> {
    await this.cache.close();
    await this.searchEngine.close();
    await this.orm.close();
  }

  private async onShutDown(): Promise<void> {
    return new Promise((resolve) => {
      this.logger.info('[Shut Down] Cleanup finished, server is shutting down');
      resolve();
    });
  }

  private async livenessCheck(): Promise<void> {
    await this.cache.healthCheck();
    await this.searchEngine.healthCheck();
    await this.orm.healthCheck();
  }

  private async readinessCheck(): Promise<void> {
    await this.cache.healthCheck();
    await this.searchEngine.healthCheck();
    await this.orm.healthCheck();
  }
}
