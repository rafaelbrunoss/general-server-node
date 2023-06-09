export enum InfrastructureErrors {
  UNABLE_TO_CONNECT_TO_DB = 'UNABLE_TO_CONNECT_TO_DB',
  CACHE_GET_ERROR = 'CACHE_GET_ERROR',
  CACHE_SET_ERROR = 'CACHE_SET_ERROR',
  TRANSACTION_ERROR = 'TRANSACTION_ERROR',

  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',
  REQUEST_TIMEOUT = 'REQUEST_TIMEOUT',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  BAD_GATEWAY = 'BAD_GATEWAY',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  GATEWAY_TIMEOUT = 'GATEWAY_TIMEOUT',
  OTHER = 'OTHER',
}
