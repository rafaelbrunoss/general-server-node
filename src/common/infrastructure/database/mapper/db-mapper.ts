import { Mapper } from '@wufe/mapper';
import { injectable } from 'inversify';

@injectable()
export class DbMapper {
  public readonly mapper: Mapper;

  constructor() {
    this.mapper = new Mapper();

    this.initialize();
  }

  private initialize(): void {
    this.mapper.withConfiguration((configuration) =>
      configuration
        .shouldIgnoreSourcePropertiesIfNotInDestination(true)
        .shouldAutomaticallyMapArrays(true),
    );
  }
}
