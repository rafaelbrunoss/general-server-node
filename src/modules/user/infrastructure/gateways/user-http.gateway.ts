import { injectable } from 'inversify';

import { ApiResult } from '@common/domain/models';

import { IUserGateway, User } from '@user/domain';

@injectable()
export class UserHttpGateway implements IUserGateway {
  public async create(user: User): Promise<ApiResult> {
    return await Promise.resolve(new ApiResult({ data: user }));
  }

  public async findById(id: string): Promise<ApiResult<User>> {
    return await Promise.resolve(
      new ApiResult({
        data: new User({ name: id }),
      }),
    );
  }

  public async findAll(): Promise<ApiResult<User[]>> {
    return await Promise.resolve(
      new ApiResult({
        data: [new User({})],
      }),
    );
  }

  public async update(user: User): Promise<ApiResult> {
    return await Promise.resolve(new ApiResult({ data: user }));
  }

  public async delete(id: string): Promise<ApiResult> {
    return await Promise.resolve(new ApiResult({ data: id }));
  }
}
