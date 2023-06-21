import { CoreEntity } from 'src/common/entities/core.entity';

export enum UserRole {
  Client = 'Client', // 0
  StoreManager = 'StoreManager', // 1
}
export class User extends CoreEntity {
  name: string;
  email: string;
  password: string;
  role: number;
  address?: string;
  cartId?: number;
  // favorites?: Store[];
  // reviews?: Review[];
  storeId?: number;
}
