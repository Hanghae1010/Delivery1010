import { PickType } from '@nestjs/swagger';
import { Menu } from '../entities/menu.entity';

export class CreateMenu extends PickType(Menu, ['name', 'price']) {}
