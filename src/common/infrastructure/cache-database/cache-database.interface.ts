import { AnyObject } from '@common/domain';

export interface ICacheDatabase {
  initialize: () => Promise<void>;
  get: (key: string) => Promise<AnyObject>;
  set: (key: string, value: AnyObject) => Promise<void>;
  close: () => Promise<void>;
  healthCheck: () => Promise<void>;
}
