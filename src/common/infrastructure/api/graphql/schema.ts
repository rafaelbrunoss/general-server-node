import { GraphQLSchema } from 'graphql';
import { injectable } from 'inversify';
import { merge } from 'lodash';

@injectable()
export class RootSchema {
  constructor(private readonly schemas: GraphQLSchema[]) {}

  public get schema(): GraphQLSchema {
    return merge(this.schemas);
  }
}
