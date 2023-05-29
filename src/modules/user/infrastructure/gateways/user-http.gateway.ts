import { injectable } from 'inversify';

import { IUserGateway, User } from '@user/domain';

@injectable()
export class UserHttpGateway implements IUserGateway {
  constructor() {}

  public async create(user: User): Promise<void> {
    return Promise.resolve();
  }

  public async findById(id: string): Promise<User> {
    return Promise.resolve(new User({}));
  }

  public async findAll(): Promise<User[]> {
    return Promise.resolve([new User({})]);
  }

  public async update(user: User): Promise<void> {
    return Promise.resolve();
  }

  public async delete(id: string): Promise<void> {
    return Promise.resolve();
  }
}
