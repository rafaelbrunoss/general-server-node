import { injectable } from 'inversify';

import { ApiResult } from '@common/domain/models';

import { IAuthGateway, AuthUser, SignInCredentials, SignUpData } from '@auth/domain';

@injectable()
export class AuthHttpGateway implements IAuthGateway {
  public async signIn(
    signInCredentials: SignInCredentials,
  ): Promise<ApiResult<AuthUser>> {
    return await Promise.resolve(
      new ApiResult({ data: new AuthUser({ name: signInCredentials.email }) }),
    );
  }

  public async signUp(signUpData: SignUpData): Promise<ApiResult<AuthUser>> {
    return await Promise.resolve(
      new ApiResult({ data: new AuthUser({ name: signUpData.email }) }),
    );
  }
}
