import { ApiResult } from '@common/domain/models';

import type { IUserGateway, User } from '@user/domain';

export class FindUserByIdUseCase {
  constructor(private userGateway: IUserGateway) {}

  public async execute(id: string): Promise<ApiResult<User>> {
    return await this.userGateway.findById(id);
  }
}
