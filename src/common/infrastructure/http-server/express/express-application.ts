import compression from 'compression';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import { createHandler } from 'graphql-http';
import helmet from 'helmet';
import { StatusCodes } from 'http-status-codes';
import { injectable } from 'inversify';
import methodOverride from 'method-override';
import overloadProtection from 'overload-protection';
import { serve, setup } from 'swagger-ui-express';


import { NODE_ENV } from '@common/domain/utils';

import { RequestedFields, RootSchema } from '@common/infrastructure/api/graphql';
import {
  InfrastructureError,
  InfrastructureErrors,
} from '@common/infrastructure/errors';
import {
  type IHttpServer,
  BaseHttpServer,
} from '@common/infrastructure/http-server';
import swaggerDocument from '@common/infrastructure/http-server/swagger/swagger.json';
import { type ILogger } from '@common/infrastructure/logger';
import { type IMonitoringTool } from '@common/infrastructure/monitoring';

@injectable()
export class ExpressApplication
  extends BaseHttpServer<express.Application>
  implements IHttpServer
{
  constructor(
    private readonly logger: ILogger,
    private readonly monitoringTool: IMonitoringTool,
    private readonly graphqlSchema: RootSchema,
    private readonly requestedFields: RequestedFields,
  ) {
    const app = express();
    super(app);
  }

  public initialize(): void {
    this.initializeSecurity();
    this.initializeBodyParsers();
    this.initializeLogging();
    this.initializePlugins();
    this.initializeControllers();
    this.initializeExtensions();
    this.initializeErrorHandlers();
    this.initializeSwagger();
  }

  public initializeSecurity(): void {
    this.app.use(urlencoded({ extended: false }));
  }

  public initializeBodyParsers(): void {
    this.app.use(json());
  }

  public initializeLogging(): void {
    this.logger.initialize();
  }

  public initializePlugins(): void {
    this.app.use(methodOverride());
    this.app.use(helmet());
    this.app.use(
      cors({
        origin: '*', // CHANGE the '*' to the url that will access thi api
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Encoding'],
        preflightContinue: false,
        optionsSuccessStatus: 204,
      }),
    );
    this.app.use(compression());
    this.app.use(
      overloadProtection('express', {
        production: NODE_ENV === 'production',
        clientRetrySecs: 1,
        sampleInterval: 5,
        maxEventLoopDelay: 42,
        maxHeapUsedBytes: 0,
        maxRssBytes: 0,
        errorPropagationMode: false,
        logging: false,
        logStatsOnReq: false,
      }),
    );
  }

  public initializeControllers(): void {
    this.app.use(
      '/graphql',
      // extractJwtMiddleware(),
      (
        req: express.Request | any,
        _: express.Response,
        next: express.NextFunction,
      ) => {
        if (!req['context']) {
          req['context'] = {};
        }
        req['context']['requestedFields'] = this.requestedFields;
        next();
      },
      createHandler({
        schema: this.graphqlSchema.schema,
        // graphiql: NODE_ENV === 'development',
        // context: req['context'],
      }),
    );
  }

  public initializeExtensions(): void {
    this.app.use(this.monitoringTool.requestCounters);
    this.app.use(this.monitoringTool.responseCounters);
    this.app.get('/metrics', this.monitoringTool.metricsRoute());
    this.monitoringTool.startMetricsCollection();
  }

  public initializeErrorHandlers(): void {
    this.app.use(
      (req: express.Request, res: express.Response, next: express.NextFunction) => {
        next(
          new InfrastructureError({
            name: InfrastructureErrors.NOT_FOUND,
            code: String(StatusCodes.NOT_FOUND),
            message: `Express did not found ${req.path}`,
          }),
        );
      },
    );

    this.app.use(
      (
        error: any,
        req: express.Request,
        res: express.Response
      ) => {
        res.status(error.status || 500);
        res.json({
          error: {
            message: error.message,
          },
        });
      },
    );
  }

  public initializeSwagger(): void {
    this.app.use('/api-docs', serve, setup(swaggerDocument));
  }
}
