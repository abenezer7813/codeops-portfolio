import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'node:crypto';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const time = new Date().toLocaleTimeString('en-GB');
    console.log(`[Middleware] ${req.method} ${req.originalUrl} at ${time}`);
    const requestId = (req.headers['x-request-id'] as string) ?? randomUUID();
    req.headers['x-request-id'] = requestId;
    res.setHeader('X-Request-Id', requestId);
     console.log(`[Middleware] ${req.method} ${req.originalUrl} at ${time} with requestId: ${requestId}`);
    next();
  }
}