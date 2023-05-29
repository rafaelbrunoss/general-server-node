import { interfaces } from 'inversify';

import { INFRASTRUCTURE_COMMON_SERVICES_SYMBOLS } from '@common/infrastructure';
import { BaseModule } from '@common/infrastructure/module';

import { APPLICATION_AUTH_SYMBOLS, SignInUseCase } from '@auth/application';

import { AuthHttpGateway, INFRASTRUCTURE_AUTH_SYMBOLS } from '@auth/infrastructure';

export class AuthModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideGateways(bind);
    this.provideUseCases(bind);
  }

  private provideGateways(bind: interfaces.Bind): void {
    bind(INFRASTRUCTURE_AUTH_SYMBOLS.AuthHttpGateway).toDynamicValue((context) => {
      return new AuthHttpGateway(
        context.container.get(INFRASTRUCTURE_COMMON_SERVICES_SYMBOLS.HttpService),
        context.container.get(INFRASTRUCTURE_COMMON_SERVICES_SYMBOLS.StorageService),
      );
    });
  }

  private provideUseCases(bind: interfaces.Bind): void {
    bind(APPLICATION_AUTH_SYMBOLS.SignInUseCase).toDynamicValue((context) => {
      return new SignInUseCase(
        context.container.get(INFRASTRUCTURE_AUTH_SYMBOLS.AuthHttpGateway),
      );
    });
  }
}
