import {
  Body,
  Controller,
  ForbiddenException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePaymentInput } from './dtos/create-payment.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { ChangePaymentStatusDto } from './dtos/change-payment-status.dto';

@ApiTags('payment')
@Controller()
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  @UseGuards(AuthGuard)
  createPayment(@Body() body: CreatePaymentInput, @CurrentUser() user: User) {
    return this.paymentService.create(body, user);
  }

  @Patch('/:id')
  changePaymentStatus(
    @Param('id') id: string,
    @Body() body: ChangePaymentStatusDto,
  ) {
    if (!body.isThirdParty) {
      throw new ForbiddenException('3rd 파티 결제 요청이 아닙니다');
    }
    return this.paymentService.updatePayment(id, body.paymentStatus);
  }
}
