import { Injectable } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}

  createOrder(newOrder: CreateOrderInput, error = null) {
    return newOrder;
  }

  /****** cart ******/

  //TODO : 모델 정의 후 타입 지정
  getCartList(usreno: number): any {
    return {};
  }
  //TODO : 모델 정의 후 타입 지정
  addCartMenu(orderno: number, menu: any) {
    return {};
  }
  //TODO : 모델 정의 후 타입 지정
  removeCartMenu(orderno: number, munu: any) {
    return {};
  }
}
