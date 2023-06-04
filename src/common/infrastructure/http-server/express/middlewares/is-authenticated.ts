import * as express from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

import {
  InfrastructureError,
  InfrastructureErrors,
} from '@common/infrastructure/errors';
import { getCurrentUser } from '@common/infrastructure/http-server/express/utils';

export const isAuthenticated =
  (config?: { role: string }) =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): Promise<void> => {
    const user = getCurrentUser(req);

    if (!user) {
      next(
        new InfrastructureError({
          name: InfrastructureErrors.UNAUTHORIZED,
          code: String(StatusCodes.UNAUTHORIZED),
          message: getReasonPhrase(StatusCodes.UNAUTHORIZED).toUpperCase(),
        }),
      );
      return;
    }

    const isAuthenticatedUser = await user.isAuthenticated();

    if (!isAuthenticatedUser) {
      next(
        new InfrastructureError({
          name: InfrastructureErrors.UNAUTHORIZED,
          code: String(StatusCodes.UNAUTHORIZED),
          message: getReasonPhrase(StatusCodes.UNAUTHORIZED).toUpperCase(),
        }),
      );
      return;
    }
    if (config) {
      const isInRole = await user.isInRole(config.role);
      if (!isInRole) {
        next(
          new InfrastructureError({
            name: InfrastructureErrors.FORBIDDEN,
            code: String(StatusCodes.FORBIDDEN),
            message: getReasonPhrase(StatusCodes.FORBIDDEN).toUpperCase(),
          }),
        );
        return;
      }
    }
    next();
  };
