import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { AuthProvider as IAuthProvider, Principal as IPrincipal } from 'inversify-express-utils';

import { type ITokenPayload, Principal, User } from '@common/domain/models';
import { APP_TOKEN_SECRET } from '@common/domain/utils';

import { Orm } from '@common/infrastructure/database/orm';
import {
  INFRASTRUCTURE_COMMON_SERVICES_SYMBOLS,
  INFRASTRUCTURE_COMMON_SYMBOLS,
} from '@common/infrastructure/infrastructure.common.symbols';
import { JwtService } from '@common/infrastructure/services';

@injectable()
export class ApplicationAuthProvider implements IAuthProvider {
  @inject(INFRASTRUCTURE_COMMON_SYMBOLS.ORM)
  private readonly orm!: Orm;

  @inject(INFRASTRUCTURE_COMMON_SERVICES_SYMBOLS.JWT_SERVICE)
  private readonly jwtService!: JwtService;

  public async getUser(
    req: Request,
    _: Response,
    next: NextFunction,
  ): Promise<IPrincipal> {
    const token = this.jwtService.getTokenFromHeaders(req.headers);
    if (!token) {
      return new Principal(undefined);
    }
    const tokenData = await this.jwtService.decodeToken(
      token,
      APP_TOKEN_SECRET as string,
    );

    if (!tokenData) {
      return new Principal(undefined);
    }

    const { user } = tokenData as ITokenPayload;

    try {
      const existingUser = await this.orm.orm.user.findUnique({
        where: {
          id: user.id,
        },
      });

      if (!existingUser) {
        return new Principal(undefined);
      }

      return new Principal(new User(user));
    } catch (error) {
      next(error);
      return new Principal(undefined);
    }
  }
}
