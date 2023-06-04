import { GraphQLFieldResolver } from 'graphql';
import { StatusCodes } from 'http-status-codes';
import { verify } from 'jsonwebtoken';

import { APP_TOKEN_SECRET } from '@common/domain/utils';

import { ComposableResolver } from '@common/infrastructure/api/graphql/composable';
import { type IResolverContext } from '@common/infrastructure/api/graphql/interfaces';
import {
  InfrastructureError,
  InfrastructureErrors,
} from '@common/infrastructure/errors';

export const verifyTokenResolver: ComposableResolver<any, IResolverContext> = (
  resolver: GraphQLFieldResolver<any, IResolverContext>,
): GraphQLFieldResolver<any, IResolverContext> => {
  return (parent, args, context: IResolverContext, info) => {
    const token: string = context.authorization
      ? context.authorization.split(' ')[1]
      : '';
    return verify(token, APP_TOKEN_SECRET as string, (err: any) => {
      if (!err) {
        return resolver(parent, args, context, info);
      }
      throw new InfrastructureError({
        name: InfrastructureErrors.UNAUTHORIZED,
        code: String(StatusCodes.UNAUTHORIZED),
        message: `${err.name}: ${err.message}`,
      });
    });
  };
};
