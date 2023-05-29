import { AuthModule } from '@auth/auth.module';
import { CommonModule } from '@common/common.module';
import { UserModule } from '@user/user.module';

import { BaseContainer } from '@common/infrastructure/container';

export class AppContainer extends BaseContainer {
  constructor() {
    super({
      defaultScope: 'Singleton',
      skipBaseClassChecks: true,
    });
  }

  /**
   * @description Order of initialization matters
   */
  public init(): void {
    this.provideCommonModule();

    this.provideAuthModule();
    this.provideUserModule();
  }

  private provideCommonModule(): void {
    this.load(new CommonModule());
  }

  private provideAuthModule(): void {
    this.load(new AuthModule());
  }

  private provideUserModule(): void {
    this.load(new UserModule());
  }
}

const appContainer = new AppContainer();
appContainer.init();

export { appContainer };
