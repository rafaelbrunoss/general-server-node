import { APP_CONFIG } from '@common/domain/utils';

export class ApiResult<T = any> {
  public data: T = {} as T;
  public utcTime: string = new Date().toUTCString();
  public success = true;
  public environment: string = APP_CONFIG.environment || 'dev';
  public messages: Array<string> = [];
  public endpoint = '';
  public tokenExpirationInMinutes?: number = undefined;

  constructor(apiResult: Partial<ApiResult>) {
    Object.assign(this, apiResult);
  }
}
