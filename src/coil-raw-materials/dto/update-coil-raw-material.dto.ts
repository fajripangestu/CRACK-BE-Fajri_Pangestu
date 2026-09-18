import { PartialType } from '@nestjs/mapped-types';
import { CreateCoilRawMaterialDto } from './create-coil-raw-material.dto';

export class UpdateCoilRawMaterialDto extends PartialType(CreateCoilRawMaterialDto) {}
