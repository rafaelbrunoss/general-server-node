import { GraphQLResolveInfo } from 'graphql';

import type { IResolverContext } from '@common/infrastructure/api/graphql/interfaces/resolver-context.interface';

export interface IGraphQLResolver {
  source: any;
  args: any;
  context: IResolverContext;
  info: GraphQLResolveInfo;
}
