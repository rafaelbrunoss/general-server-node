export interface IHttpServer {
  initializeBodyParsers: () => void;
  initializeLogging: () => void;
  initializePlugins: () => void;
  initializeExtensions: () => void;
  initializeSecurity: () => void;
  initializeControllers: () => void;
  initializeErrorHandlers: () => void;
  initializeSwagger: () => void;
}
