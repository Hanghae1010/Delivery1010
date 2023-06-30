import { Injectable } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.dto';
import { DataSource, QueryRunner } from 'typeorm';
import { CommonService } from '../common/common.service';

@Injectable()
export class OrdersService {
  constructor() {}

  createOrder(newOrder: CreateOrderInput, error = null) {
    return newOrder;
  }
}
