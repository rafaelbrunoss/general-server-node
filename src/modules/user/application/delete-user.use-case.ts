import { ApiResult } from '@common/domain/models';

import type { IUserGateway } from '@user/domain';

export class DeleteUserUseCase {
  constructor(private userGateway: IUserGateway) {}

  public async execute(id: string): Promise<ApiResult> {
    return await this.userGateway.delete(id);
  }
}
