import { inject } from 'inversify';

import { BaseError } from '@common/domain/errors';

import { INFRASTRUCTURE_COMMON_SYMBOLS } from '@common/infrastructure/infrastructure.common.symbols';
import type { ILogger } from '@common/infrastructure/logger';

export class InfrastructureError extends BaseError {
  @inject(INFRASTRUCTURE_COMMON_SYMBOLS.LOGGER) private logger!: ILogger;

  constructor(infrastructureError: Partial<InfrastructureError>) {
    super(infrastructureError);
    Object.assign(this, infrastructureError);
    if (infrastructureError.message) {
      this.logger.error(infrastructureError.message);
    }
  }
}
