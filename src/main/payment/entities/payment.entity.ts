import { IsEnum, IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/main/common/entities/core.entity';
import { Store } from 'src/main/stores/entities/store.entity';
import { User } from 'src/main/users/entities/user.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

export enum PaymentStatus {
  Paid = 'Paid',
  InProgress = 'InProgress',
  Cancelled = 'Cancelled',
}

@Entity()
export class Payment extends CoreEntity {
  @Column()
  @IsString()
  transactionId: string;

  @Column()
  @IsNumber()
  paymentPrice: number;

  @Column()
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;

  @ManyToOne((type) => User, (user) => user.payments)
  user: User;
  @RelationId((payment: Payment) => payment.user)
  userId: User;

  @ManyToOne((type) => Store)
  store: Store;
  @RelationId((payment: Payment) => payment.store)
  storeId: number;
}
