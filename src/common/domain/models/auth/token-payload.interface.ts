import { User } from '@common/domain/models/auth/user';

export interface ITokenPayload {
  user: User;
}
