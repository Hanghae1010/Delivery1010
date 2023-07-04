import { IsEmail, IsEnum, IsString } from 'class-validator';
import { CoreEntity } from 'src/main/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

export enum UserRole {
  Client = 'Client', // 0
  StoreManager = 'StoreManager', // 1
}
export enum UserStatus {
  Active = 'Active',
  Blocked = 'Blocked',
  Deleted = 'Deleted',
}
@Entity()
export class User extends CoreEntity {
  @Column()
  @IsString()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;

  @Column()
  @IsString()
  address: string;

  @Column({ type: 'enum', enum: UserStatus })
  @IsEnum(UserStatus)
  status: UserStatus;
}
