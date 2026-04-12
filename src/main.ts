import 'reflect-metadata';
import 'dotenv/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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
    new ClassSerializerInterceptor(reflector, { excludeExtraneousValues: true }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Zenvix API')
    .setDescription('Zenvix backend REST API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
