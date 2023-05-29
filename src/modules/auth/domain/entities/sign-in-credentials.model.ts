export class SignInCredentials {
  public email = '';
  public password = '';

  constructor(signInCredentials: Partial<SignInCredentials>) {
    Object.assign(this, signInCredentials);
  }
}
