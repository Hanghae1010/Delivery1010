import { IsNumber, IsString } from 'class-validator';
import { Menu } from 'src/main/menus/entities/menu.entity';
import { User } from 'src/main/users/entities/user.entity';
import { Column, OneToMany } from 'typeorm';

export class Store extends User {
  @Column({ unique: true })
  @IsNumber()
  userId: number;

  @Column({ unique: true })
  @IsString()
  storeName?: string;

  @Column()
  @IsString()
  content?: string;

  @OneToMany((type) => Menu, (menu) => menu.store)
  menus!: Menu[];
}
