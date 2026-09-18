import { PartialType } from '@nestjs/mapped-types';
import { CreateMaterialLocationDto } from './create-material-location.dto';

export class UpdateMaterialLocationDto extends PartialType(CreateMaterialLocationDto) {}
