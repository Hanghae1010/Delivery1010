import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { SetStoreInfo } from './dtos/set-store-info.dto';
import { UpdateStoreInfo } from './dtos/update-store-info.dto';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get('/:id')
  findOne(@Param('id') storeId: number) {
    return this.storesService.findOne(storeId);
  }
  @Post('/:id')
  async addInfo(@Param('id') storeId: number, @Body() data: SetStoreInfo) {
    const storeData = await this.storesService.addInfo(storeId, data);
    return storeData;
  }
  @Patch('/:id')
  async updateInfo(
    @Param('id') storeId: number,
    @Body() data: UpdateStoreInfo,
  ) {
    const storeData = await this.storesService.updateInfo(storeId, data);
    return storeData;
  }
  @Delete('/:id')
  async removeInfo(@Param('id') storeId: number) {
    const store = await this.storesService.removeInfo(storeId);
    return store;
  }
}
