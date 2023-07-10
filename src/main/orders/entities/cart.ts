import { CoreEntity } from 'src/main/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class cart extends CoreEntity {
  @Column({ unique: true })
  cartId: string;
  @Column()
  userId: string;
  @Column()
  storeId: number;
  @Column()
  menuId: number;
  @Column()
  orderId: string;
  @Column()
  quantity: number;
  @Column()
  status: string;
}
