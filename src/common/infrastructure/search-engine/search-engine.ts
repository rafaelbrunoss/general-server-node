import { injectable } from 'inversify';

import type { ILogger } from '@common/infrastructure/logger';
import type { ISearchEngine } from '@common/infrastructure/search-engine';

@injectable()
export class SearchEngine implements ISearchEngine {
  constructor(private readonly logger: ILogger) {}

  public async initialize(): Promise<void> {
    // initialize Elasticsearch
    this.logger.info(`[Connected to the search engine]`);
  }

  public async close(): Promise<void> {
    this.logger.info(`[Disconnected to the search engine]`);
  }

  public async healthCheck(): Promise<any> {
    // TO DO
  }
}
