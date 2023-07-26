import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppRouterModule } from './app-router.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { User } from './main/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { APP_PIPE } from '@nestjs/core';
import { OrdersModule } from './main/orders/orders.module';
import { AlertsModule } from './main/alerts/alerts.module';
import { UsersModule } from './main/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Menu } from './main/menus/entities/menu.entity';
import LoggerMiddleware from './utils/logger.middleware';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');
@Module({
  imports: [
    AppRouterModule,
    // OrdersModule,
    // AlertsModule,
    // UsersModule,
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
    //   ignoreEnvFile: process.env.NODE_ENV === 'prod',
    //   validationSchema: Joi.object({
    //     NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
    //     DB_PORT: 3306,
    //     DB_HOST:
    //       'delivery1010-mysql-2.csghjebsa21j.ap-northeast-2.rds.amazonaws.com',
    //     DB_USERNAME: 'admin',
    //     DB_PASSWORD: 'delivery1010!#',
    //     DB_DATABASE: 'delivery1010',
    //   }),
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'delivery1010.mysql.database.azure.com',
      port: 3306,
      username: 'admin_',
      password: 'delivery1010!#',
      database: 'delivery1010',
      synchronize: process.env.NODE_ENV !== 'prod',
      entities: [User],
      logging:
        process.env.NODE_ENV !== 'prod' && process.env.NODE_ENV !== 'test',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    // on every incoming request
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer
      .apply(
        cookieSession({
          keys: ['asdf'],
        }),
      )
      .forRoutes('*');
  }
}
