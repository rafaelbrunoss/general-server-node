import { interfaces } from 'inversify';

import { INFRASTRUCTURE_COMMON_SERVICES_SYMBOLS } from '@common/infrastructure';
import { BaseModule } from '@common/infrastructure/module';
import { EnvironmentService } from '@common/infrastructure/services';

export class CommonModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideServices(bind);
  }

  private provideServices(bind: interfaces.Bind): void {
    bind(INFRASTRUCTURE_COMMON_SERVICES_SYMBOLS.EnvironmentService).to(
      EnvironmentService,
    );
  }
}
