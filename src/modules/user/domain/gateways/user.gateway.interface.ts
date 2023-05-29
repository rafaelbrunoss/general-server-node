import { User } from '@user/domain';

export interface IUserGateway {
  create: (user: User) => Promise<void>;
  findById: (id: string) => Promise<User>;
  findAll: () => Promise<User[]>;
  update: (user: User) => Promise<void>;
  delete: (id: string) => Promise<void>;
}
