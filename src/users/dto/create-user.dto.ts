import { PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class CreateAccountInput extends PickType(User, [
  'name',
  'email',
  'password',
  'role',
  'address',
]) {}

export class CreateAccountOutput {}
