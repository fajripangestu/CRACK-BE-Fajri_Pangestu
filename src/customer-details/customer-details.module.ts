import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { CustomerDetailsController } from './customer-details.controller';
import { CustomerDetailsRepository } from './customer-details.repository';
import { CustomerDetailsService } from './customer-details.service';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [CustomerDetailsController],
  providers: [CustomerDetailsRepository, CustomerDetailsService],
})
export class CustomerDetailsModule {}
