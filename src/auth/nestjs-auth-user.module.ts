import { Module } from '@nestjs/common';
import { UserService } from '@sclable/nestjs-auth';

@Module({
  providers: [UserService],
  exports: [UserService],
})
export class NestjsAuthUserModule {}
