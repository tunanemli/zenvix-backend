import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtGuard, LocalAuthModule, LocalGuard, UserService } from '@sclable/nestjs-auth';
import { UserModule } from '@/user/user.module';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    LocalAuthModule.forRootAsync({
      imports: [UserModule],
      inject: [UserService, ConfigService],
      useFactory: (user: UserService, config: ConfigService) => ({
        config: config.getOrThrow('auth'),
        userService: user,
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, { provide: APP_GUARD, useClass: JwtGuard }, LocalGuard],
})
export class AuthModule {}
