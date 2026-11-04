import { Transform } from 'class-transformer';
import {
  IsInt,
  IsString,
  IsNumber,
  IsDateString,
  IsEnum,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';

import {
  Product_type,
  Coating_type,
  Chemical_Treatment,
} from 'generated/prisma/client';

export class CreateCustomerOrderDto {
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty()
  companyAddress: string;

  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty()
  contactPerson: string;

  @IsOptional()
  @IsEmail()
  customerEmail?: string;

  @IsOptional()
  @IsString()
  customerPhone?: string;

  @IsOptional()
  @IsUUID()
  customerDetailId?: string;

  @IsEnum(Product_type)
  productType: Product_type;

  @IsEnum(Coating_type)
  coatingType: Coating_type;

  @IsInt()
  coatingMass: number;

  @IsNumber()
  TCT: number;

  @IsNumber()
  minTCT: number;

  @IsNumber()
  maxTCT: number;

  @IsNumber()
  BMT: number;

  @IsNumber()
  minBMT: number;

  @IsNumber()
  maxBMT: number;

  @IsNumber()
  width: number;

  @IsNumber()
  minWidth: number;

  @IsNumber()
  maxWidth: number;

  @IsString()
  Grade: string;

  @IsInt()
  YS: number;

  @IsInt()
  minYS: number;

  @IsInt()
  maxYS: number;

  @IsInt()
  TS: number;

  @IsInt()
  minTS: number;

  @IsInt()
  maxTS: number;

  @IsNumber()
  EL: number;

  @IsNumber()
  minEL: number;

  @IsNumber()
  maxEL: number;

  @IsEnum(Chemical_Treatment)
  chemicalTreatment: Chemical_Treatment;

  @IsInt()
  minCoilWeight: number;

  @IsInt()
  maxCoilWeight: number;

  @IsInt()
  totalQuantity: number;

  @IsString()
  export: string;

  @IsDateString()
  deliveryTime: string;

  @IsString()
  orderStatus: string;

  @IsString()
  note: string;
}
