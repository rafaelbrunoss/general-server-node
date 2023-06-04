import { Application, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { BaseError, DomainError } from '@common/domain/errors';

import { ErrorResponse, InfrastructureError } from '@common/infrastructure/errors';

export const errorHandler = (app: Application) =>
  app.use((error: BaseError, req: Request, res: Response, next: NextFunction) => {
    next();
    switch (error.constructor) {
      case InfrastructureError:
        return res
          .status(Number((error as InfrastructureError).code))
          .json(new ErrorResponse(error));
      case DomainError:
        return res
          .status(StatusCodes.UNPROCESSABLE_ENTITY)
          .json(new ErrorResponse(error));
      case BaseError:
        return res.status(StatusCodes.NOT_FOUND).json(new ErrorResponse(error));
      default:
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
          new ErrorResponse({
            code: StatusCodes.INTERNAL_SERVER_ERROR.toString(),
            message: error.message,
          }),
        );
    }
  });
