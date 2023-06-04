import { GraphQLFieldResolver } from 'graphql';
import { StatusCodes } from 'http-status-codes';

import {
  ComposableResolver,
  verifyTokenResolver,
} from '@common/infrastructure/api/graphql/composable';
import { type IResolverContext } from '@common/infrastructure/api/graphql/interfaces';
import {
  InfrastructureError,
  InfrastructureErrors,
} from '@common/infrastructure/errors';

export const authResolver: ComposableResolver<any, IResolverContext> = (
  resolver: GraphQLFieldResolver<any, IResolverContext>,
): GraphQLFieldResolver<any, IResolverContext> => {
  return (parent, args, context: IResolverContext, info) => {
    if (context.authUser || context.authorization) {
      return resolver(parent, args, context, info);
    }
    throw new InfrastructureError({
      name: InfrastructureErrors.BAD_REQUEST,
      code: String(StatusCodes.BAD_REQUEST),
      message: 'Unauthorized! Token not provided!',
    });
  };
};

export const authResolvers = [authResolver, verifyTokenResolver];
