import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';

@Module({
  providers: [MenusService],
})
export class MenusModule {}
