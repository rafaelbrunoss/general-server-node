import { AuthModule } from '@auth/auth.module';
import { CommonModule } from '@common/common.module';
import { UserModule } from '@user/user.module';
import { InversifyExpressServer } from 'inversify-express-utils';

import { BaseContainer } from '@common/infrastructure/container';
import {
  ExpressApplication,
  errorHandler,
} from '@common/infrastructure/http-server/express';
import { ApplicationAuthProvider } from '@common/infrastructure/http-server/express/middlewares';
import { INFRASTRUCTURE_COMMON_SYMBOLS } from '@common/infrastructure/infrastructure.common.symbols';

import { AppModule } from './app.module';

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
    // This should be the first one
    this.provideCommonModule();

    this.provideAuthModule();
    this.provideUserModule();

    // Those should be last ones
    this.provideAppModule();
    this.provideInversifyExpressApplication();
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

  private provideAppModule(): void {
    this.load(new AppModule());
  }

  private provideInversifyExpressApplication(): void {
    this.bind<InversifyExpressServer>(
      INFRASTRUCTURE_COMMON_SYMBOLS.INVERSIFY_APPLICATION,
    ).toConstantValue(
      new InversifyExpressServer(
        this,
        null,
        { rootPath: '/' },
        this.get<ExpressApplication>(INFRASTRUCTURE_COMMON_SYMBOLS.HTTP_SERVER).app,
        ApplicationAuthProvider,
      ).setErrorConfig(errorHandler),
    );
  }
}

const appContainer = new AppContainer();
appContainer.init();

export { appContainer };
