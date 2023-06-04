import { interfaces } from 'inversify';

import { BaseModule } from '@common/infrastructure/module';

import {
  APPLICATION_USER_SYMBOLS,
  CreateUserUseCase,
  DeleteUserUseCase,
  FindAllUsersUseCase,
  FindUserByIdUseCase,
  UpdateUserUseCase,
} from '@user/application';

import { UserHttpGateway, INFRASTRUCTURE_USER_SYMBOLS } from '@user/infrastructure';

export class UserModule extends BaseModule {
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
    bind(INFRASTRUCTURE_USER_SYMBOLS.UserHttpGateway).to(UserHttpGateway);
  }

  private provideUseCases(bind: interfaces.Bind): void {
    bind(APPLICATION_USER_SYMBOLS.CreateUserUseCase).toDynamicValue((context) => {
      return new CreateUserUseCase(
        context.container.get(INFRASTRUCTURE_USER_SYMBOLS.UserHttpGateway),
      );
    });
    bind(APPLICATION_USER_SYMBOLS.DeleteUserUseCase).toDynamicValue((context) => {
      return new DeleteUserUseCase(
        context.container.get(INFRASTRUCTURE_USER_SYMBOLS.UserHttpGateway),
      );
    });
    bind(APPLICATION_USER_SYMBOLS.FindAllUsersUseCase).toDynamicValue((context) => {
      return new FindAllUsersUseCase(
        context.container.get(INFRASTRUCTURE_USER_SYMBOLS.UserHttpGateway),
      );
    });
    bind(APPLICATION_USER_SYMBOLS.FindUserByIdUseCase).toDynamicValue((context) => {
      return new FindUserByIdUseCase(
        context.container.get(INFRASTRUCTURE_USER_SYMBOLS.UserHttpGateway),
      );
    });
    bind(APPLICATION_USER_SYMBOLS.UpdateUserUseCase).toDynamicValue((context) => {
      return new UpdateUserUseCase(
        context.container.get(INFRASTRUCTURE_USER_SYMBOLS.UserHttpGateway),
      );
    });
  }
}
