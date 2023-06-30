import { PickType } from '@nestjs/swagger';
import { Order } from '../entities/order.entity';

export class CreateOrderInput extends PickType(Order, [
  'OrderNo',
  'Address',
  'AddressDetail',
  'PhoneNumber',
  'PaymentMethod',
  'PaymentStatus',
  'OrderStatus',
]) {}

export class CreateAccountOutput {}
