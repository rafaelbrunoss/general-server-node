import { Principal as IPrincipal } from 'inversify-express-utils';

import { User } from '@common/domain/models/auth/user';

export class Principal implements IPrincipal {
  public details: User | undefined;

  public constructor(details: User | undefined) {
    this.details = details;
  }

  public isAuthenticated(): Promise<boolean> {
    return Promise.resolve(!!this.details);
  }

  public isResourceOwner(resourceId: any): Promise<boolean> {
    return Promise.resolve(resourceId === true);
  }

  public isInRole(role: string): Promise<boolean> {
    return Promise.resolve(role === this.details?.role);
  }
}
