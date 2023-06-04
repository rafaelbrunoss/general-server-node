import { injectable } from 'inversify';

import { NODE_ENV } from '@common/domain/utils';

@injectable()
export class EnvironmentService {
  public get isDev(): boolean {
    return NODE_ENV === 'development';
  }

  public get isStg(): boolean {
    return NODE_ENV === 'staging';
  }

  public get isProd(): boolean {
    return NODE_ENV === 'production';
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
