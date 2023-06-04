import { ApiResult } from '@common/domain/models';

import type { IUserGateway, User } from '@user/domain';

export class CreateUserUseCase {
  constructor(private userGateway: IUserGateway) {}

  public async execute(user: User): Promise<ApiResult> {
    return await this.userGateway.create(user);
  }
}
