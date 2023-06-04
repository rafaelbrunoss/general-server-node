import { interfaces } from 'inversify';

import { RequestedFields } from '@common/infrastructure/api/graphql/ast/requested-fields';
import { RootSchema } from '@common/infrastructure/api/graphql/schema';
import { type IHttpServer } from '@common/infrastructure/http-server';
import { ExpressApplication } from '@common/infrastructure/http-server/express/express-application';
import {
  INFRASTRUCTURE_COMMON_GRAPHQL_SYMBOLS,
  INFRASTRUCTURE_COMMON_SYMBOLS,
} from '@common/infrastructure/infrastructure.common.symbols';
import { BaseModule } from '@common/infrastructure/module';

// import { UserSchema } from '@user/user_interface/api/graphql/modules/user/user/user.schema';
// import { UserMutation } from '@user/user_interface/api/graphql/modules/user/user/user.mutation';
// import { UserQuery } from '@user/user_interface/api/graphql/modules/user/user/user.query';

export class AppModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideGraphQLSchemas(bind);
    this.provideGraphQLUtils(bind);

    this.provideHttpServer(bind);
  }

  private provideGraphQLSchemas(bind: interfaces.Bind): void {
    // bind<UserMutation>(INFRASTRUCTURE_COMMON_GRAPHQL_SYMBOLS.USER_MUTATION).to(UserMutation);
    // bind<UserQuery>(INFRASTRUCTURE_COMMON_GRAPHQL_SYMBOLS.USER_QUERY).to(UserQuery);
    // bind<UserSchema>(INFRASTRUCTURE_COMMON_GRAPHQL_SYMBOLS.USER_SCHEMA).to(UserSchema);

    bind<RootSchema>(
      INFRASTRUCTURE_COMMON_GRAPHQL_SYMBOLS.GRAPHQL_ROOT_SCHEMA,
    ).toDynamicValue(
      (context) =>
        new RootSchema([
          context.container.get(INFRASTRUCTURE_COMMON_GRAPHQL_SYMBOLS.USER_SCHEMA),
        ]),
    );
  }

  private provideGraphQLUtils(bind: interfaces.Bind): void {
    bind<RequestedFields>(
      INFRASTRUCTURE_COMMON_GRAPHQL_SYMBOLS.GRAPHQL_REQUESTED_FIELDS,
    ).to(RequestedFields);
  }

  private provideHttpServer(bind: interfaces.Bind): void {
    bind<IHttpServer>(INFRASTRUCTURE_COMMON_SYMBOLS.HTTP_SERVER).toDynamicValue(
      (context) =>
        new ExpressApplication(
          context.container.get(INFRASTRUCTURE_COMMON_SYMBOLS.LOGGER),
          context.container.get(INFRASTRUCTURE_COMMON_SYMBOLS.MONITORING_TOOL),
          context.container.get(
            INFRASTRUCTURE_COMMON_GRAPHQL_SYMBOLS.GRAPHQL_ROOT_SCHEMA,
          ),
          context.container.get(
            INFRASTRUCTURE_COMMON_GRAPHQL_SYMBOLS.GRAPHQL_REQUESTED_FIELDS,
          ),
        ),
    );
  }
}
