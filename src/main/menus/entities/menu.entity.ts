import { IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/main/common/entities/core.entity';
import { Store } from 'src/main/stores/entities/store.entity';
import { Column, ManyToOne } from 'typeorm';

export class Menu extends CoreEntity {
  @Column()
  @IsString()
  name: string;

  @Column()
  @IsNumber()
  price: number;

  @ManyToOne((type) => Store, (store) => store.menus, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  store!: Store;
}
