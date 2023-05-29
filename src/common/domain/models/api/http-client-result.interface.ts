import { ApiResult } from '@common/domain/models';

export interface IHttpClientResult<T = any> {
  data: ApiResult<T>;
  status: number;
}
