import { IncomingHttpHeaders } from 'http';
import { injectable } from 'inversify';
import { Secret, sign, verify } from 'jsonwebtoken';

@injectable()
export class JwtService {
  private readonly AUTH_HEADER = 'authorization';
  private readonly SCHEME = 'bearer';
  private readonly MATCHER = /(\S+)\s+(\S+)/;

  public generateToken(
    payload: any,
    payloadKey: string,
    secret: Secret,
    expiresIn: string | number,
  ): string {
    return sign(payloadKey ? { [payloadKey]: payload } : payload, secret, {
      expiresIn,
    });
  }

  public decodeToken(token: string, secret: string): object | string | null {
    try {
      return verify(token, secret);
    } catch {
      return null;
    }
  }

  public getTokenFromHeaders(headers: IncomingHttpHeaders): string | null {
    const authHeader = headers[this.AUTH_HEADER];
    if (!authHeader) {
      return null;
    }
    const matches = authHeader.match(this.MATCHER);

    return matches && matches[2];
  }
}
