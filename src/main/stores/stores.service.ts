import { Injectable, NotFoundException } from '@nestjs/common';
import { Store } from './entities/store.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SetStoreInfo } from './dtos/set-store-info.dto';
import { UpdateStoreInfo } from './dtos/update-store-info.dto';

@Injectable()
export class StoresService {
  constructor(@InjectRepository(Store) private repo: Repository<Store>) {}
  findOne(storeId: number) {
    const store = this.repo.findOneBy({ id: storeId });
    if (!store) throw new NotFoundException('store not found');
    return store;
  }
  async addInfo(storeId: number, data: SetStoreInfo) {
    const store = await this.findOne(storeId);
    Object.assign(store, data);
    return this.repo.save(store);
  }
  async updateInfo(storeId: number, data: UpdateStoreInfo) {
    const store = await this.findOne(storeId);
    Object.assign(store, data);
    return this.repo.save(store);
  }
  async removeInfo(storeId: number) {
    const store = await this.findOne(storeId);
    return this.repo.remove(store);
  }
}
