import { Expose } from 'class-transformer';
import { UserRole, UserStatus } from '../../users/entities/user.entity';

export class UserDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  role: UserRole;
  @Expose()
  address?: string;
  @Expose()
  status: UserStatus;
}
