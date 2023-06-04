import { injectable } from 'inversify';
import { createClient, RedisClientType } from 'redis';
import { promisify } from 'util';

import {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_USER,
  REDIS_PASSWORD,
  AnyObject,
} from '@common/domain/utils';

import { type ICacheDatabase } from '@common/infrastructure/cache-database';
import {
  InfrastructureError,
  InfrastructureErrors,
} from '@common/infrastructure/errors';
import { type ILogger } from '@common/infrastructure/logger';

@injectable()
export class CacheDatabase implements ICacheDatabase {
  private cache: RedisClientType<AnyObject, Record<any, any>>;

  constructor(private readonly logger: ILogger) {
    this.cache = createClient({
      url: `redis://${REDIS_USER}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`,
    });
  }

  public async initialize(): Promise<void> {
    await this.cache.connect();
    this.cache.flushAll();

    this.cache.get = promisify(this.cache.get) as any;
    this.cache.set = promisify(this.cache.set) as any;

    // await this.cache.set('healthcheck', 'OK');
    this.logger.info(`[Connected to the cache database]`);
  }

  public async get(key: string): Promise<AnyObject> {
    try {
      const value: AnyObject = await this.cache.get(key);
      if (value) {
        return JSON.parse(value as AnyObject);
      }
      return null;
    } catch (err) {
      throw new InfrastructureError({
        name: InfrastructureErrors.CACHE_GET_ERROR,
        code: InfrastructureErrors.CACHE_GET_ERROR,
        message: `Error trying to execute GET in cache database: ${err}`,
      });
    }
  }

  public async set(key: string, value: any): Promise<void> {
    try {
      await this.cache.set(key, JSON.stringify(value), {
        EX: 60 * 60 * 24,
      });
    } catch (err) {
      throw new InfrastructureError({
        name: InfrastructureErrors.CACHE_SET_ERROR,
        code: InfrastructureErrors.CACHE_SET_ERROR,
        message: `Error trying to execute SET in cache database: ${err}`,
      });
    }
  }

  public async close(): Promise<void> {
    await this.cache.quit();
    this.logger.info(`[Disconnected to the cache database]`);
  }

  public async healthCheck(): Promise<void> {
    try {
      await this.cache.get('healthcheck');
    } catch (err) {
      throw new InfrastructureError({
        name: InfrastructureErrors.CACHE_GET_ERROR,
        code: InfrastructureErrors.CACHE_GET_ERROR,
        message: `Error trying to execute GET in cache database: ${err}`,
      });
    }
  }
}
