import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckingResultDto } from './create-checking-result.dto';

export class UpdateCheckingResultDto extends PartialType(CreateCheckingResultDto) {}
