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

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');
@Module({
  imports: [
    AppRouterModule,
    // OrdersModule,
    // AlertsModule,
    // UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
        DB_PORT: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
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
    consumer
      .apply(
        cookieSession({
          keys: ['asdf'],
        }),
      )
      .forRoutes('*');
  }
}
