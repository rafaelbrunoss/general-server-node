import { Request, Response, NextFunction, RequestHandler } from 'express';

export interface IMonitoringTool {
  responseCounters: any;
  initialize: () => Promise<void>;
  startMetricsCollection: () => void;
  requestCounters: (req: Request, res: Response, next: NextFunction) => void;
  metricsRoute: () => RequestHandler;
}
