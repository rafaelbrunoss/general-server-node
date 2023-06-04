import {
  BaseHttpController,
  controller,
} from 'inversify-express-utils';

@controller('/')
export class RestController extends BaseHttpController {}
