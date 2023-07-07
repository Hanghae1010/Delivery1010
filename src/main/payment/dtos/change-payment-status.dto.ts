import { IsBoolean, IsEnum } from 'class-validator';
import { PaymentStatus } from '../entities/payment.entity';

export class ChangePaymentStatusDto {
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;
  @IsBoolean()
  isThirdParty: boolean;
}
