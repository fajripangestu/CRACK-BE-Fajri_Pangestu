import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApprovalStatus } from 'generated/prisma/client';

export class UpdateOrderApprovalDto {
  @IsEnum(ApprovalStatus)
  status: ApprovalStatus;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  note?: string;
}
