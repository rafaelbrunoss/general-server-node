// import type { IAuthService } from '@core/application/services/auth/authService.interface';
// import { AuthenticationRequest } from '@core/application/services/auth/requests/authenticationRequest';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';

import { APP_TOKEN_LIFE, APP_TOKEN_SECRET } from '@common/domain/utils';

import {
  InfrastructureError,
  InfrastructureErrors,
} from '@common/infrastructure/errors';
import { INFRASTRUCTURE_COMMON_SERVICES_SYMBOLS } from '@common/infrastructure/infrastructure.common.symbols';
import { JwtService } from '@common/infrastructure/services';

import { Authentication } from '@auth/infrastructure/http-server/authentication';
import type { IAuthenticationHandler } from '@auth/infrastructure/http-server/authentication-handler.interface';

@injectable()
export class JWTAuthenticationHandler implements IAuthenticationHandler {
  constructor(
    @inject(INFRASTRUCTURE_COMMON_SERVICES_SYMBOLS.JWT_SERVICE)
    private readonly jwtService: JwtService,
    // @inject(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.AUTH_SERVICE)
    // private readonly authService: IAuthService,
  ) {}

  public async authenticate(
    // request: AuthenticationRequest,
  ): Promise<Authentication> {
    // const user = await this.authService.verifyCredentials(request);
    const user = {};

    if (!user) {
      throw new InfrastructureError({
        code: String(StatusCodes.UNAUTHORIZED),
        name: InfrastructureErrors.UNAUTHORIZED,
        message: getReasonPhrase(StatusCodes.UNAUTHORIZED).toUpperCase(),
      });
    }

    return new Authentication(
      this.jwtService.generateToken(
        user,
        'user',
        APP_TOKEN_SECRET as string,
        APP_TOKEN_LIFE as string,
      ),
    );
  }
}
