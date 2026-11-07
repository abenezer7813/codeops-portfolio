import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RestaurantNotFoundError } from './restaurant.errors.js';

@Catch(RestaurantNotFoundError)
export class DomainErrorFilter implements ExceptionFilter {
  catch(err: RestaurantNotFoundError, host: ArgumentsHost) {
    host.switchToHttp().getResponse()
      .status(404)
      .json({ statusCode: 404, message: err.message });
  }
}