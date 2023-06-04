import { Authentication } from '@auth/infrastructure/http-server/authentication';
import { AuthenticationRequest } from '@auth/infrastructure/http-server/authentication-request';


export interface IAuthenticationHandler {
  authenticate: (request: AuthenticationRequest) => Promise<Authentication>;
}
