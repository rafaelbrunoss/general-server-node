import { NODE_ENV } from '@common/domain/utils';

export class ApiResult<T = any> {
  public data: T = {} as T;
  public utcTime: string = new Date().toUTCString();
  public success = true;
  public environment: string = NODE_ENV || 'development';
  public messages: Array<string> = [];
  public endpoint = '';
  public tokenExpirationInMinutes?: number = undefined;

  constructor(apiResult: Partial<ApiResult>) {
    Object.assign(this, apiResult);
  }
}
