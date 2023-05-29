import { ApiResult } from '@common/domain/models';

import { IUserGateway, User } from '@user/domain';

export class UpdateUserUseCase {
  constructor(private userGateway: IUserGateway) {}

  public async execute(user: User): Promise<ApiResult> {
    return await this.userGateway.update(user);
  }
}
