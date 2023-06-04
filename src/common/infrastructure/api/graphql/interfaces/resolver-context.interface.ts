import { RequestedFields } from '@common/infrastructure/api/graphql/ast';
import { type IAuthUser } from '@common/infrastructure/api/graphql/interfaces';

export interface IResolverContext {
  authorization?: string;
  authUser?: IAuthUser;
  requestedFields: RequestedFields;
}
