import { Id } from '@common/domain/value-objects';

export class User {
  public id: Id = Id.create();
  public name = '';

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
