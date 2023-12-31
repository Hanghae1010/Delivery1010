import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderInput } from './dto/create-order.dto';
import { CartMenuListDto, MenuListDto } from './dto/cart-list.dto';

@ApiTags('order')
@Controller('')
export class OrdersController {
  constructor(private readonly _orderService: OrdersService) {}

  @Get('')
  getOrders() {
    return 'test';
  }

  @Post('')
  createOrder(@Body() newOrder: CreateOrderInput) {
    this._orderService.createOrder(newOrder);
  }

  @Get('cart/:id')
  async getCart(@Param('userid') userid: Number) {
    const cart = new CartMenuListDto();
    cart.cardId = 1;
    const menu = new MenuListDto();
    menu.menuId = 1;
    menu.name = '치킨';
    menu.price = 20000;
    menu.quantity = 1;
    cart.Menu = [];
    cart.Menu.push(menu);
    cart.totalPrice = 20000;

    return cart;
  }

  @Post('cart/:id')
  async addCartMenu(
    @Param('userid') userid: number,
    @Body() body: MenuListDto,
  ) {
    return '';
  }
}
