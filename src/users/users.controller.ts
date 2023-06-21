import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateAccountInput } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createAccount(@Body() createAccountInput: CreateAccountInput) {
    return this.usersService.createAccount(createAccountInput);
  }
}
