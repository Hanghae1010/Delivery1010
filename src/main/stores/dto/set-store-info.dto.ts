import { PickType } from '@nestjs/swagger';
import { Store } from '../entities/store.entity';

export class SetStoreInfo extends PickType(Store, ['storeName', 'content']) {}
