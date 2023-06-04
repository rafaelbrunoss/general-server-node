export const INFRASTRUCTURE_COMMON_SERVICES_SYMBOLS = {
  CONNECTION_SERVICE: Symbol.for('ConnectionService'),
  ENVIRONMENT_SERVICE: Symbol.for('EnvironmentService'),
  JWT_SERVICE: Symbol.for('JwtService'),
};

export const INFRASTRUCTURE_COMMON_SYMBOLS = {
  DB_MAPPER: Symbol.for('DbMapper'),
  CACHE_DATABASE: Symbol.for('CacheDatabase'),
  MONITORING_TOOL: Symbol.for('MonitoringTool'),
  ORM: Symbol.for('Orm'),
  SEARCH_ENGINE: Symbol.for('SearchEngine'),
  HTTP_SERVER: Symbol.for('HttpServer'),
  INVERSIFY_APPLICATION: Symbol.for('InversifyExpressApplication'),
  AUTH_PROVIDER: Symbol.for('ApplicationAuthProvider'),
  JWT_AUTHENTICATION_HANDLER: Symbol.for('JWTAuthenticationHandler'),
  LOGGER: Symbol.for('Logger'),
  PROCESS_HANDLER: Symbol.for('ProcessHandler'),
  SCHEDULER: Symbol.for('Scheduler'),
};

export const INFRASTRUCTURE_COMMON_GRAPHQL_SYMBOLS = {
  GRAPHQL_ROOT_SCHEMA: Symbol.for('GraphQLRootSchema'),
  GRAPHQL_MIDDLEWARE: Symbol.for('GraphQLMiddleware'),
  GRAPHQL_OPTIONS: Symbol.for('GraphQLOptions'),
  GRAPHIQL_OPTIONS: Symbol.for('GraphiQLOptions'),
  GRAPHQL_REQUESTED_FIELDS: Symbol.for('GraphQLRequestedFields'),
  USER_QUERY: Symbol.for('UserQuery'),
  USER_MUTATION: Symbol.for('UserMutation'),
  USER_SCHEMA: Symbol.for('UserSchema'),
};
