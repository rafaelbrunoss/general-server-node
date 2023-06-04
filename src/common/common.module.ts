import { interfaces } from 'inversify';

import { INFRASTRUCTURE_COMMON_SERVICES_SYMBOLS } from '@common/infrastructure';
import {
  type ICacheDatabase,
  CacheDatabase,
} from '@common/infrastructure/cache-database';
import { DbMapper } from '@common/infrastructure/database';
import { Orm } from '@common/infrastructure/database/orm/orm';
import type { IOrm } from '@common/infrastructure/database/orm/orm.interface';
import { INFRASTRUCTURE_COMMON_SYMBOLS } from '@common/infrastructure/infrastructure.common.symbols';
import { type ILogger, Logger } from '@common/infrastructure/logger';
import { BaseModule } from '@common/infrastructure/module';
import {
  type IMonitoringTool,
  MonitoringTool,
} from '@common/infrastructure/monitoring';
import {
  type IProcessHandler,
  ProcessHandler,
} from '@common/infrastructure/process-handler';
import { type IScheduler, Scheduler } from '@common/infrastructure/scheduler';
import {
  type ISearchEngine,
  SearchEngine,
} from '@common/infrastructure/search-engine';
import {
  EnvironmentService,
  ConnectionService,
} from '@common/infrastructure/services';

export class CommonModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideLogger(bind);

    this.provideOrm(bind);
    this.provideCacheDatabase(bind);
    this.provideSearchEngine(bind);

    this.provideDbMapper(bind);
    this.provideProcessHandler(bind);
    this.provideServices(bind);
    this.provideMonitoringTool(bind);
    this.provideScheduler(bind);
  }

  private provideLogger(bind: interfaces.Bind): void {
    bind<ILogger>(INFRASTRUCTURE_COMMON_SYMBOLS.LOGGER).to(Logger);
  }

  private provideOrm(bind: interfaces.Bind): void {
    bind<IOrm>(INFRASTRUCTURE_COMMON_SYMBOLS.ORM).toDynamicValue(
      (context) =>
        new Orm(context.container.get(INFRASTRUCTURE_COMMON_SYMBOLS.LOGGER)),
    );
  }

  private provideCacheDatabase(bind: interfaces.Bind): void {
    bind<ICacheDatabase>(
      INFRASTRUCTURE_COMMON_SYMBOLS.CACHE_DATABASE,
    ).toDynamicValue(
      (context) =>
        new CacheDatabase(
          context.container.get(INFRASTRUCTURE_COMMON_SYMBOLS.LOGGER),
        ),
    );
  }

  private provideSearchEngine(bind: interfaces.Bind): void {
    bind<ISearchEngine>(INFRASTRUCTURE_COMMON_SYMBOLS.SEARCH_ENGINE).toDynamicValue(
      (context) =>
        new SearchEngine(
          context.container.get(INFRASTRUCTURE_COMMON_SYMBOLS.LOGGER),
        ),
    );
  }

  private provideDbMapper(bind: interfaces.Bind): void {
    bind<DbMapper>(INFRASTRUCTURE_COMMON_SYMBOLS.DB_MAPPER).to(DbMapper);
  }

  private provideProcessHandler(bind: interfaces.Bind): void {
    bind<IProcessHandler>(
      INFRASTRUCTURE_COMMON_SYMBOLS.PROCESS_HANDLER,
    ).toDynamicValue(
      (context) =>
        new ProcessHandler(
          context.container.get(INFRASTRUCTURE_COMMON_SYMBOLS.LOGGER),
          context.container.get(INFRASTRUCTURE_COMMON_SYMBOLS.ORM),
          context.container.get(INFRASTRUCTURE_COMMON_SYMBOLS.CACHE_DATABASE),
          context.container.get(INFRASTRUCTURE_COMMON_SYMBOLS.SEARCH_ENGINE),
        ),
    );
  }

  private provideServices(bind: interfaces.Bind): void {
    bind(INFRASTRUCTURE_COMMON_SERVICES_SYMBOLS.CONNECTION_SERVICE).toDynamicValue(
      (context) =>
        new ConnectionService(
          context.container.get(INFRASTRUCTURE_COMMON_SYMBOLS.LOGGER),
        ),
    );

    bind(INFRASTRUCTURE_COMMON_SERVICES_SYMBOLS.ENVIRONMENT_SERVICE).to(
      EnvironmentService,
    );
  }

  private provideMonitoringTool(bind: interfaces.Bind): void {
    bind<IMonitoringTool>(
      INFRASTRUCTURE_COMMON_SYMBOLS.MONITORING_TOOL,
    ).toDynamicValue(
      (context) =>
        new MonitoringTool(
          context.container.get(INFRASTRUCTURE_COMMON_SYMBOLS.LOGGER),
        ),
    );
  }

  private provideScheduler(bind: interfaces.Bind): void {
    bind<IScheduler>(INFRASTRUCTURE_COMMON_SYMBOLS.SCHEDULER).toDynamicValue(
      (context) =>
        new Scheduler(context.container.get(INFRASTRUCTURE_COMMON_SYMBOLS.LOGGER)),
    );
  }
}
