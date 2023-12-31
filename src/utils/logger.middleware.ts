/* eslint-disable @typescript-eslint/naming-convention */
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';

import { EnvService } from '../config/env/env.service';
import Logger from '../lib/logger/logger';

const config = new ConfigService();
const env = new EnvService(config);
const loggerInstance = new Logger(env);

export default function logger(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { method, originalUrl, body } = req;
  const session = req.sessionID;

  const start = Date.now();

  loggerInstance.info({
    Session: session,
    Request: `${method} ${originalUrl}`,
    Headers: Object.entries(req.headers).map(
      ([key, value]) => `${key}: ${value}`,
    ),
    Body: JSON.stringify(body),
  });

  const oldSend = res.send.bind(res);
  // eslint-disable-next-line
  res.send = <T>(data: T): Response<T> => {
    const responseData = oldSend.call(res, data);

    loggerInstance.info({
      Session: session,
      Response: `${method} ${originalUrl} ${res.statusCode} ${
        Date.now() - start
      }ms`,
      Headers: Object.entries(req.headers).map(
        ([key, value]) => `${key}: ${value}`,
      ),
      Body: JSON.stringify(data),
    });

    return responseData;
  };

  next();
}
