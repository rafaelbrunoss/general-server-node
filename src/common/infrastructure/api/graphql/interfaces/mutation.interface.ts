import { type IGraphQLResolver } from '@common/infrastructure/api/graphql/interfaces';

export interface IMutation {
  name: string;
  type: any;
  args: any;
  resolve: ({ source, args, context, info }: IGraphQLResolver) => Promise<any>;
}
