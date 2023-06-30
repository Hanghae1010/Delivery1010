import { PartialType } from '@nestjs/swagger';
import { SetStoreInfo } from './set-store-info.dto';

export class UpdateStoreInfo extends PartialType(SetStoreInfo) {}
