import { ApiResult } from '@common/domain/models';

import type { IAuthGateway, AuthUser, SignInCredentials } from '@auth/domain';

export class SignInUseCase {
  constructor(private authGateway: IAuthGateway) {}

  public async execute(
    signInCredentials: SignInCredentials,
  ): Promise<ApiResult<AuthUser>> {
    return await this.authGateway.signIn(signInCredentials);
  }
}
