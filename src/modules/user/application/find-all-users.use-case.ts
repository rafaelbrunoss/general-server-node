import { ApiResult } from '@common/domain/models';

import { IUserGateway, User } from '@user/domain';

export class FindAllUsersUseCase {
  constructor(private userGateway: IUserGateway) {}

  public async execute(): Promise<ApiResult<User[]>> {
    return await this.userGateway.findAll();
  }
}
