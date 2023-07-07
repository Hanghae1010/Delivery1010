import { PickType } from '@nestjs/swagger';
import { Payment } from '../entities/payment.entity';

export class CreatePaymentInput extends PickType(Payment, [
  'transactionId',
  'paymentPrice',
  'storeId',
]) {}
