import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';

const defaultDatabaseUrl = 'postgresql://zenvix:zenvix@localhost:5432/zenvix';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      driver: PostgreSqlDriver,
      clientUrl: process.env.DATABASE_URL ?? defaultDatabaseUrl,
      autoLoadEntities: true,
      debug: process.env.NODE_ENV === 'development',
      discovery: { warnWhenNoEntities: false },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
