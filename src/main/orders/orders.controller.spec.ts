import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import exp from 'constants';
import { CartMenuListDto, MenuListDto } from './dto/cart-list.dto';
import { OrdersService } from './orders.service';

describe('OrderController', () => {
  let controller: OrdersController;
  let fakeOrerService: Partial<OrdersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [{ provide: OrdersService, useValue: OrdersService }],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  describe('장바구니 테스트', () => {
    it('장바구니 목록 가져오기', async () => {
      const userId = 1;
      const result = await controller.getCart(userId);
      expect(result).toBeInstanceOf(CartMenuListDto);
    });
    it('장바구니 추가하기', async () => {
      const userId = 1;
      const cartId = 1;
      const test: MenuListDto = {
        menuId: 1,
        name: '123',
        price: 12000,
        quantity: 1,
      };
      const result = await controller.addCartMenu(userId, test);
      expect(result).toBeInstanceOf({});
    });
  });

  describe('장바구니 테스트', () => {
    it('장바구니 목록 가져오기', async () => {
      const userId = 1;
      const result = await controller.getCart(userId);
      expect(result).toBeInstanceOf({});
    });
  });
});
