import { ApiResult } from '@common/domain/models';

import type { IAuthGateway, AuthUser, SignUpData } from '@auth/domain';

export class SignUpUseCase {
  constructor(private authGateway: IAuthGateway) {}

  public async execute(signUpData: SignUpData): Promise<ApiResult<AuthUser>> {
    return await this.authGateway.signUp(signUpData);
  }
}
