import { Languages } from '@common/domain/models';
import { Id } from '@common/domain/value-objects';

export class AuthUser {
  public id: Id = Id.create();
  public name = '';
  public email = '';
  public photoUrl = '';
  public token = '';
  public tokenExpirationDate: Date = new Date();
  public language: Languages = Languages.DEFAULT;
  public permission: number[] = [];

  constructor(authUser: Partial<AuthUser>) {
    Object.assign(this, authUser);
  }
}
