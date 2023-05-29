import { AnyObject } from '@common/domain/utils';

export interface IHttpClientConfig {
  url?: string;
  params?: AnyObject;
  data?: AnyObject;
  headers?: AnyObject;
}
