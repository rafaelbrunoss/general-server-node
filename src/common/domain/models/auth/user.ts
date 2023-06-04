export class User {
  public readonly id: string = '';
  public readonly name: string = '';
  public readonly email: string = '';
  public readonly role: string = '';

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
