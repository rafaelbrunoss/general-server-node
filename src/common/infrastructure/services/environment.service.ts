import { injectable } from 'inversify';

import { APP_CONFIG } from '@common/domain/utils';

@injectable()
export class EnvironmentService {
  public get isDev(): boolean {
    return APP_CONFIG.environment === 'dev';
  }

  public get isStg(): boolean {
    return APP_CONFIG.environment === 'stg';
  }

  public get isProd(): boolean {
    return APP_CONFIG.environment === 'prod';
  }

  public getEnvironmentUrl(): string {
    if (this.isProd) {
      return '';
    } else if (this.isStg) {
      return '-stg';
    } else if (this.isDev) {
      return '-dev';
    } else {
      // localhost
      return '-dev';
    }
  }
}
