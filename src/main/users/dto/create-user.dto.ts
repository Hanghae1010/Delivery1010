import { PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class CreateUserInput extends PickType(User, [
  'name',
  'email',
  'password',
  'role',
  'address',
  'status',
]) {}
