import { Request, Response, NextFunction, RequestHandler } from 'express';
import { injectable } from 'inversify';
import {
  Counter,
  Histogram,
  Summary,
  register,
  collectDefaultMetrics,
} from 'prom-client';
import responseTime from 'response-time';

import type { ILogger } from '@common/infrastructure/logger';
import type { IMonitoringTool } from '@common/infrastructure/monitoring';

@injectable()
export class MonitoringTool implements IMonitoringTool {
  public httpRequestDurationMicroseconds: Histogram<any>;
  public numOfRequests: Counter<any>;
  public pathsTaken: Counter<any>;
  public responses: Summary<any>;
  public responseCounters: any;

  constructor(private readonly logger: ILogger) {
    this.httpRequestDurationMicroseconds = new Histogram({
      name: 'http_request_duration_ms',
      help: 'Duration of HTTP requests in ms',
      labelNames: ['route'],
      buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500],
    });

    this.numOfRequests = new Counter({
      name: 'numOfRequests',
      help: 'Number of requests made',
      labelNames: ['method'],
    });

    this.pathsTaken = new Counter({
      name: 'pathsTaken',
      help: 'Paths taken in the app',
      labelNames: ['path'],
    });

    this.responses = new Summary({
      name: 'responses',
      help: 'Response time in millis',
      labelNames: ['method', 'path', 'status'],
    });

    this.responseCounters = responseTime(
      (req: Request, res: Response, time: number) => {
        if (req.url !== '/metrics') {
          this.responses
            .labels(req.method, req.url, res.statusCode.toString())
            .observe(time);
        }
      },
    );
  }

  public async initialize(): Promise<void> {
    this.logger.info(`[Monitoring tool initialized]`);
  }

  public startMetricsCollection(): void {
    this.logger.info(`[Starting the collection of metrics available on '/metrics']`);
    collectDefaultMetrics();
  }

  public requestCounters(req: Request, res: Response, next: NextFunction): void {
    if (req.path !== '/metrics') {
      this.numOfRequests.inc({ method: req.method });
      this.pathsTaken.inc({ path: req.path });
    }
    next();
  }

  public metricsRoute(): RequestHandler {
    return (req: Request, res: Response) => {
      res.set('Content-Type', register.contentType);
      res.end(register.metrics());
    };
  }
}
