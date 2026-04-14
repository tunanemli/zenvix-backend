import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from '@sclable/nestjs-auth';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import authConfig from '@/config/auth.config';
import { envValidationSchema } from '@/config/env.validation';
import { AuthModule } from './auth/auth.module';
import { NestjsAuthUserModule } from './auth/nestjs-auth-user.module';
import { ModulesModule } from './modules/modules.module';
import { UserModule } from './user/user.module';

const defaultDatabaseUrl = 'postgresql://zenvix:zenvix@localhost:5432/zenvix';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig],
      validationSchema: envValidationSchema,
      validationOptions: {
        abortEarly: true,
        allowUnknown: true,
      },
    }),
    NestjsAuthUserModule,
    MikroOrmModule.forRoot({
      driver: PostgreSqlDriver,
      clientUrl: process.env.DATABASE_URL ?? defaultDatabaseUrl,
      metadataProvider: ReflectMetadataProvider,
      autoLoadEntities: true,
      debug: process.env.NODE_ENV === 'development',
      discovery: { warnWhenNoEntities: false },
    }),
    ModulesModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
