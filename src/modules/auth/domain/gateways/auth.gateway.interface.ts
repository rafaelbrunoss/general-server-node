import { ApiResult } from '@common/domain/models';

import { SignInCredentials, AuthUser, SignUpData } from '@auth/domain';

export interface IAuthGateway {
  signIn: (signInCredentials: SignInCredentials) => Promise<ApiResult<AuthUser>>;
  signUp: (signUpData: SignUpData) => Promise<ApiResult<AuthUser>>;
}
