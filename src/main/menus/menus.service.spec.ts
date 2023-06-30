import { Test, TestingModule } from '@nestjs/testing';
import { MenusService } from './menus.service';
import { NotAcceptableException, NotFoundException } from '@nestjs/common';

describe('MenusService', () => {
  let service: MenusService;
  const data = {
    name: 'fried chicken',
    price: 20000,
    description: 'JMT',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenusService],
    }).compile();

    service = module.get<MenusService>(MenusService);
  });

  describe('getAll', () => {
    it('should get all menus', () => {
      expect(service.getAll()).toBeInstanceOf(Array);
    });
  });

  describe('create', () => {
    it('should create a menu', () => {
      const beforeCreateMenuCount = service.getAll().length;
      service.create(data);
      const afterCreateMenuCount = service.getAll().length;
      expect(afterCreateMenuCount).toBeGreaterThan(beforeCreateMenuCount);
    });
  });

  describe('getOne', () => {
    it('should throw a NotFoundException', () => {
      try {
        service.getOne(-1);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
    it('should get a menu', () => {
      service.create(data);
      const createdMenu = service.getOne(1);
      expect(createdMenu).toBeDefined();
    });
  });

  describe('update', () => {
    it('should throw a NotFoundException', () => {
      try {
        service.update(-1, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
    it('should throw a NotAcceptableException', () => {
      service.create(data);
      try {
        service.update(1, { price: -1 });
      } catch (e) {
        expect(e).toBeInstanceOf(NotAcceptableException);
      }
    });
    it('should update the menu', () => {
      service.create(data);
      const TARGET_PRICE = 30000;
      service.update(1, { price: TARGET_PRICE });
      const afterUpdatePrice = service.getOne(1).price;
      expect(afterUpdatePrice).toEqual(TARGET_PRICE);
    });
  });

  describe('delete', () => {
    it('should throw a NotFoundException', () => {
      try {
        service.delete(-1);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
    it('should delete the menu', () => {
      service.create(data);
      const beforeDeleteMenuCount = service.getAll().length;
      service.delete(1);
      const afterDeleteMenuCount = service.getAll().length;
      expect(afterDeleteMenuCount).toBeLessThan(beforeDeleteMenuCount);
    });
  });
});
