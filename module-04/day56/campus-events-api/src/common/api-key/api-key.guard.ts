import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'];
    const expected = process.env.CLASSROOM_API_KEY;

    console.log('[Guard] expected set:', !!expected, '| received:', apiKey);
    if (!expected || apiKey !== expected) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}