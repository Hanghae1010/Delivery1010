import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment, PaymentStatus } from './entities/payment.entity';
import { Not, Repository } from 'typeorm';
import { Store } from '../stores/entities/store.entity';
import { CreatePaymentInput } from './dtos/create-payment.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PaymentService {
  /* constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(Store)
    private readonly storeRepo: Repository<Store>,
  ) {}

  async create(
    { transactionId, paymentPrice, storeId }: CreatePaymentInput,
    user: Partial<User>,
  ) {
    const store = await this.storeRepo.findOne({
      where: { id: storeId },
    });
    if (!store) {
      throw new NotFoundException('가게를 찾을 수 없습니다');
    }
    const payment = this.paymentRepo.create({
      transactionId,
      paymentPrice,
      paymentStatus: PaymentStatus.InProgress,
      user,
      store,
    });
    return this.paymentRepo.save(payment);
  }

  async updatePayment(id: string, paymentStatus: PaymentStatus) {
    const payment = await this.paymentRepo.findOne({
      where: { id: parseInt(id) },
    });
    if (!payment) {
      throw new NotFoundException('결제 내용을 찾을 수 없습니다');
    }
    payment.paymentStatus = paymentStatus;
    return this.paymentRepo.save(payment);
  }*/
}
