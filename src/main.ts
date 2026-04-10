import 'dotenv/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { SnakeCaseInterceptor } from '@/common/interceptors/snake-case.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(
    new SnakeCaseInterceptor(),
    new ClassSerializerInterceptor(reflector, {
      excludeExtraneousValues: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
