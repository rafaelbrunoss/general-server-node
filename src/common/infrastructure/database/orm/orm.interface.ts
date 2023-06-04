import { PrismaClient } from '@prisma/client';

export interface IOrm {
  orm: PrismaClient;
  initialize: () => Promise<void>;
  close: () => Promise<void>;
  healthCheck: () => Promise<void>;
}
