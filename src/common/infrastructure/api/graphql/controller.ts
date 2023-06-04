import {
  BaseHttpController,
  controller
} from 'inversify-express-utils';

@controller('/graphql')
export class GraphQLController extends BaseHttpController {}
