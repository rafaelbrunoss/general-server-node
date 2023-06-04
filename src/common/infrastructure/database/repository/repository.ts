import { inject, injectable } from 'inversify';

import { type ICacheDatabase } from '@common/infrastructure/cache-database';
import { type IOrm } from '@common/infrastructure/database';
import { Query } from '@common/infrastructure/database/repository/query';
import { IRepository } from '@common/infrastructure/database/repository/repository.interface';
import {
  InfrastructureError,
  InfrastructureErrors,
} from '@common/infrastructure/errors';
import { INFRASTRUCTURE_COMMON_SYMBOLS } from '@common/infrastructure/infrastructure.common.symbols';

@injectable()
export abstract class Repository<Entity> implements IRepository<Entity> {
  @inject(INFRASTRUCTURE_COMMON_SYMBOLS.CACHE_DATABASE)
  private readonly cache!: ICacheDatabase;

  @inject(INFRASTRUCTURE_COMMON_SYMBOLS.ORM)
  private readonly orm!: IOrm;

  constructor(public readonly model: string) {}

  public async findById(id: string): Promise<Entity | null> {
    let result = await this.cache.get(`${this.orm.orm[this.model].name} ${id}`);
    if (!result) {
      result = await this.orm.orm[this.model].findOne({
        where: { id },
        raw: true,
      });
      if (result) {
        this.cache.set(`${this.orm.orm[this.model].name} ${id}`, result);
      }
    }
    return result;
  }

  public async findOneBy(
    condition: Query<Entity>,
    findOptions?: Query<Entity>,
  ): Promise<Entity> {
    let result = await this.cache.get(
      `${this.orm.orm[this.model].name} ${JSON.stringify(condition)}`,
    );
    if (!result) {
      result = await this.orm.orm[this.model].findOne({
        ...findOptions,
        where: condition,
        raw: true,
      });
      if (result) {
        this.cache.set(
          `${this.orm.orm[this.model].name} ${JSON.stringify(condition)}`,
          result,
        );
      }
    }
    return result;
  }

  public async findManyBy(condition: Query<Entity>): Promise<Entity[]> {
    let result = await this.cache.get(
      `${this.orm.orm[this.model].name} ${JSON.stringify(condition)}`,
    );
    if (!result) {
      result = await this.orm.orm[this.model].findAll({
        where: condition,
        raw: true,
      });
      if (result) {
        this.cache.set(
          `${this.orm.orm[this.model].name} ${JSON.stringify(condition)}`,
          result,
        );
      }
    }
    return result;
  }

  public async findManyByIds(ids: string[], attributes?: any): Promise<Entity[]> {
    let result = await this.cache.get(
      `${this.orm.orm[this.model].name} ${ids.length} - ${ids[0]} - ${
        ids[ids.length - 1]
      }`,
    );
    if (!result) {
      result = await this.orm.orm[this.model].findAll({
        where: { id: ids },
        attributes,
        raw: true,
      });
      if (result) {
        this.cache.set(
          `${this.orm.orm[this.model].name} ${ids.length} - ${ids[0]} - ${
            ids[ids.length - 1]
          }`,
          result,
        );
      }
    }
    return result;
  }

  public async findAll(
    findOptions?: Query<Entity>,
    cacheOptions?: any[],
  ): Promise<Entity[]> {
    let result = cacheOptions
      ? await this.cache.get(
          `${this.orm.orm[this.model].name} findAll ${cacheOptions.length} - ${
            cacheOptions[0]
          } - ${cacheOptions[cacheOptions.length - 1]}`,
        )
      : await this.cache.get(
          `${this.orm.orm[this.model].name} findAll ${JSON.stringify(findOptions)}`,
        );
    if (!result) {
      result = await this.orm.orm[this.model].findAll({
        ...findOptions,
        raw: true,
      });
      if (result) {
        cacheOptions
          ? this.cache.set(
              `${this.orm.orm[this.model].name} findAll ${cacheOptions.length} - ${
                cacheOptions[0]
              } - ${cacheOptions[cacheOptions.length]}`,
              result,
            )
          : this.cache.set(
              `${this.orm.orm[this.model].name} findAll ${JSON.stringify(
                findOptions,
              )}`,
              result,
            );
      }
    }
    return result;
  }

  public async update(
    condition: Query<Entity>,
    data: Entity,
  ): Promise<boolean | undefined> {
    try {
      return !!(await this.orm.orm[this.model].update({
        where: condition,
        data,
      }));
    } catch (error) {
      throw new InfrastructureError({
        name: InfrastructureErrors.TRANSACTION_ERROR,
        code: InfrastructureErrors.TRANSACTION_ERROR,
        message: `Transaction ERROR: ${error}`,
      });
    }
  }

  public async updateAll(
    condition: Query<Entity>,
    data: Entity,
  ): Promise<boolean | undefined> {
    try {
      return !!(await this.orm.orm[this.model].update({
        where: condition,
        data,
      }));
    } catch (error) {
      throw new InfrastructureError({
        name: InfrastructureErrors.TRANSACTION_ERROR,
        code: InfrastructureErrors.TRANSACTION_ERROR,
        message: `Transaction ERROR: ${error}`,
      });
    }
  }

  public async delete(condition: Query<Entity>): Promise<boolean | undefined> {
    try {
      return !!(await this.orm.orm[this.model].delete({
        where: condition,
      }));
    } catch (error) {
      throw new InfrastructureError({
        name: InfrastructureErrors.TRANSACTION_ERROR,
        code: InfrastructureErrors.TRANSACTION_ERROR,
        message: `Transaction ERROR: ${error}`,
      });
    }
  }

  public async deleteAll(condition: Query<Entity>): Promise<boolean | undefined> {
    try {
      return !!(await this.orm.orm[this.model].delete({
        where: condition,
      }));
    } catch (error) {
      throw new InfrastructureError({
        name: InfrastructureErrors.TRANSACTION_ERROR,
        code: InfrastructureErrors.TRANSACTION_ERROR,
        message: `Transaction ERROR: ${error}`,
      });
    }
  }

  public async save(entity: Entity): Promise<Entity | undefined> {
    try {
      return await this.orm.orm[this.model].create({
        data: entity,
      });
    } catch (error) {
      throw new InfrastructureError({
        name: InfrastructureErrors.TRANSACTION_ERROR,
        code: InfrastructureErrors.TRANSACTION_ERROR,
        message: `Transaction ERROR: ${error}`,
      });
    }
  }

  public async saveAll(entities: Entity[]): Promise<Entity[] | undefined> {
    try {
      return await this.orm.orm[this.model].createMany({
        data: entities,
      });
    } catch (error) {
      throw new InfrastructureError({
        name: InfrastructureErrors.TRANSACTION_ERROR,
        code: InfrastructureErrors.TRANSACTION_ERROR,
        message: `Transaction ERROR: ${error}`,
      });
    }
  }

  public async upsert(
    condition: Query<Entity>,
    data: Entity,
  ): Promise<Entity | undefined> {
    try {
      return await this.orm.orm[this.model].upsert({
        where: condition,
        create: data,
        update: data,
      });
    } catch (error) {
      throw new InfrastructureError({
        name: InfrastructureErrors.TRANSACTION_ERROR,
        code: InfrastructureErrors.TRANSACTION_ERROR,
        message: `Transaction ERROR: ${error}`,
      });
    }
  }

  public async query(query: string): Promise<Entity[] | undefined> {
    try {
      return await this.orm.orm.$queryRaw`${query}`;
    } catch (error) {
      throw new InfrastructureError({
        name: InfrastructureErrors.TRANSACTION_ERROR,
        code: InfrastructureErrors.TRANSACTION_ERROR,
        message: `Transaction ERROR: ${error}`,
      });
    }
  }
}
