import { CallHandler, ExecutionContext, Injectable, NestInterceptor, StreamableFile } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import snakecaseKeys from 'snakecase-keys';

@Injectable()
export class SnakeCaseInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(map((data) => this.toSnakeCase(data)));
  }

  private toSnakeCase(data: unknown): unknown {
    if (data === null || data === undefined) {
      return data;
    }
    if (typeof data !== 'object') {
      return data;
    }
    if (data instanceof StreamableFile || Buffer.isBuffer(data)) {
      return data;
    }
    if (Array.isArray(data)) {
      return data.map((item) => this.toSnakeCase(item));
    }
    return snakecaseKeys(data as Record<string, unknown>, { deep: true });
  }
}
