import { Server as HttpServer } from 'http';
import { injectable } from 'inversify';
import { AddressInfo } from 'net';

import { type ILogger } from '@common/infrastructure';

@injectable()
export class ConnectionService {
  constructor(private readonly logger: ILogger) {}

  public normalizePort = (val: number | string): number => {
    return typeof val === 'string' ? Number(val) : val;
  };

  public onError = (server: HttpServer) => {
    return (error: NodeJS.ErrnoException): void => {
      const addr: any = server.address();
      if (error.syscall !== 'listen') {
        throw error;
      }
      const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
      switch (error.code) {
        case 'EACCES':
          this.logger.error(`${bind} requires elevated privileges`);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          this.logger.error(`${bind} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    };
  };

  public onListening = (server: HttpServer) => {
    return (): void => {
      const addr: string | AddressInfo | null = server.address();
      const bind =
        addr === null
          ? 'NULL_ADDRESS'
          : typeof addr === 'string'
          ? `pipe ${addr}`
          : `http://${addr.address}:${addr.port}`;
      this.logger.info(`[Listening at ${bind}]`);
    };
  };
}
