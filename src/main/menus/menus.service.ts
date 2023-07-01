import { Injectable } from '@nestjs/common';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MenusService {
  constructor(@InjectRepository(Menu) private repo: Repository<Menu>) {}

  create(name: string, price: number, storeId: number) {
    const menu = this.repo.create({
      name,
      price,
      store: { id: storeId },
    });
    return this.repo.save(menu);
  }
  getAll(): [] {
    return [];
  }
  getOne(id) {
    return {};
  }
  update(id, data) {
    return {};
  }
  delete(id) {
    return {};
  }
}
