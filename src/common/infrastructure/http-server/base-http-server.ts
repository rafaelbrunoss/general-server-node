export abstract class BaseHttpServer<T> {
  protected readonly _app: T;

  protected constructor(app: T) {
    this._app = app;
  }

  public abstract initialize(): void;

  public get app(): T {
    return this._app;
  }
}
