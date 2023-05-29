import { injectable } from 'inversify';

import { IAuthGateway, AuthUser, SignInCredentials, SignUpData } from '@auth/domain';

@injectable()
export class AuthHttpGateway implements IAuthGateway {
  constructor() {}

  public async signIn(
    signInCredentials: SignInCredentials,
  ): Promise<AuthUser> {
    return Promise.resolve(new AuthUser({}));
  }

  public async signUp(signUpData: SignUpData): Promise<AuthUser> {
    return Promise.resolve(new AuthUser({}));
  }
}
