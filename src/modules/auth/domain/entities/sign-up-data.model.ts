export class SignUpData {
  public email = '';
  public password = '';

  constructor(signUpData: Partial<SignUpData>) {
    Object.assign(this, signUpData);
  }
}
