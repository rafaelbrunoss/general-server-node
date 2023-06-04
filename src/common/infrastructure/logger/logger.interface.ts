export interface ILogger {
  initialize: () => void;
  info: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
}
