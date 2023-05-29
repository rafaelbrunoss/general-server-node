import { SignInCredentials, AuthUser, SignUpData } from '@auth/domain';

export interface IAuthGateway {
  signIn: (signInCredentials: SignInCredentials) => Promise<AuthUser>;
  signUp: (signUpData: SignUpData) => Promise<AuthUser>;
}
