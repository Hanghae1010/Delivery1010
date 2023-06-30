import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { OrdersModule } from 'src/main/orders/orders.module';
import { AppModule } from './app.module';
import { AuthModule } from './main/auth/auth.module';
import { UsersModule } from './main/users/users.module';
import { AlertsModule } from './main/alerts/alerts.module';
import { CommonModule } from './main/common/common.module';


const routes: Routes = [
  { path: 'orders', module: OrdersModule },
  { path: 'alerts', module: AlertsModule },
  { path: 'users', module: UsersModule },
  { path: 'auth', module: AuthModule },
];

@Module({
  imports: [

    RouterModule.register(routes),
    OrdersModule,
    AlertsModule,
    AuthModule,
    UsersModule,
  
  ],
  providers: [],
})
export class AppRouterModule {}
