import 'reflect-metadata';

import * as http from 'http';
import { InversifyExpressServer } from 'inversify-express-utils';

import { PORT, HOST } from '@common/domain/utils';

import { type ICacheDatabase } from '@common/infrastructure/cache-database';
import { type IOrm } from '@common/infrastructure/database/orm';
import { ExpressApplication } from '@common/infrastructure/http-server/express';
import {
  INFRASTRUCTURE_COMMON_SERVICES_SYMBOLS,
  INFRASTRUCTURE_COMMON_SYMBOLS,
} from '@common/infrastructure/infrastructure.common.symbols';
import { type IMonitoringTool } from '@common/infrastructure/monitoring';
import { type IProcessHandler } from '@common/infrastructure/process-handler';
import { type IScheduler } from '@common/infrastructure/scheduler';
import { type ISearchEngine } from '@common/infrastructure/search-engine';
import { ConnectionService } from '@common/infrastructure/services';

import { AppContainer } from './app.container';

(async () => {
  const appContainer = new AppContainer();
  appContainer.init();
  appContainer
    .get<ExpressApplication>(INFRASTRUCTURE_COMMON_SYMBOLS.HTTP_SERVER)
    .initialize();
  Promise.all([
    await appContainer.get<IOrm>(INFRASTRUCTURE_COMMON_SYMBOLS.ORM).initialize(),
    await appContainer
      .get<ICacheDatabase>(INFRASTRUCTURE_COMMON_SYMBOLS.CACHE_DATABASE)
      .initialize(),
    await appContainer
      .get<ISearchEngine>(INFRASTRUCTURE_COMMON_SYMBOLS.SEARCH_ENGINE)
      .initialize(),
    await appContainer
      .get<IMonitoringTool>(INFRASTRUCTURE_COMMON_SYMBOLS.MONITORING_TOOL)
      .initialize(),
    await appContainer
      .get<IScheduler>(INFRASTRUCTURE_COMMON_SYMBOLS.SCHEDULER)
      .initialize(),
  ]);

  const connectionService = appContainer.get<ConnectionService>(
    INFRASTRUCTURE_COMMON_SERVICES_SYMBOLS.CONNECTION_SERVICE,
  );

  const app = appContainer
    .get<InversifyExpressServer>(INFRASTRUCTURE_COMMON_SYMBOLS.INVERSIFY_APPLICATION)
    .build();

  const server = http.createServer(app);
  await appContainer
    .get<IProcessHandler>(INFRASTRUCTURE_COMMON_SYMBOLS.PROCESS_HANDLER)
    .initialize(server);
  server.listen({
    port: connectionService.normalizePort(PORT as string),
    hostname: HOST,
  });
  server.on('error', connectionService.onError(server));
  server.on('listening', connectionService.onListening(server));
})();
