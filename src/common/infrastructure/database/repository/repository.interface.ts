import { Query } from '@common/infrastructure/database/repository/query';

export interface IRepository<Entity> {
  model: string;

  delete: (condition: Query<Entity>) => Promise<boolean | undefined>;
  deleteAll: (condition: Query<Entity>) => Promise<boolean | undefined>;
  findById: (id: string) => Promise<Entity | null>;
  findAll: (findOptions?: Query<Entity>, cacheOptions?: any[]) => Promise<Entity[]>;
  findOneBy: (
    condition: Query<Entity>,
    findOptions?: Query<Entity>,
  ) => Promise<Entity>;
  findManyBy: (condition: Query<Entity>) => Promise<Entity[]>;
  findManyByIds: (ids: string[], attributes?: any) => Promise<Entity[]>;
  query: (query: string, parameters?: any[]) => Promise<Entity[] | undefined>;
  save: (entity: Entity) => Promise<Entity | undefined>;
  saveAll: (entities: Entity[]) => Promise<Entity[] | undefined>;
  update: (condition: Query<Entity>, data: Entity) => Promise<boolean | undefined>;
  updateAll: (
    condition: Query<Entity>,
    data: Entity,
  ) => Promise<boolean | undefined>;
  upsert: (condition: Query<Entity>, data: Entity) => Promise<Entity | undefined>;
}
