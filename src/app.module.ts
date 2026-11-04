import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CoatingsModule } from './coatings/coatings.module';
import { DimensionsModule } from './dimensions/dimensions.module';
import { CheckingResultsModule } from './checking-results/checking-results.module';
import { ProductionDetailsModule } from './production-details/production-details.module';
import { LabResultsModule } from './lab-results/lab-results.module';
import { CoilRawMaterialsModule } from './coil-raw-materials/coil-raw-materials.module';
import { ProductionPlansModule } from './production-plans/production-plans.module';
import { StandardsModule } from './standards/standards.module';
import { SalesModule } from './sales/sales.module';
import { ProcurementsModule } from './procurements/procurements.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { MaterialLocationsModule } from './material-locations/material-locations.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserHistoryModule } from './user-history/user-history.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ConfigModule } from '@nestjs/config';
import { CustomerOrdersModule } from './customer-orders/customer-orders.module';
import { CustomerDetailsModule } from './customer-details/customer-details.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProductsModule,
    CoatingsModule,
    DimensionsModule,
    CheckingResultsModule,
    ProductionDetailsModule,
    LabResultsModule,
    CoilRawMaterialsModule,
    ProductionPlansModule,
    StandardsModule,
    SalesModule,
    ProcurementsModule,
    OrdersModule,
    UsersModule,
    MaterialLocationsModule,
    PrismaModule,
    AuthModule,
    UserHistoryModule,
    DashboardModule,
    CustomerOrdersModule,
    CustomerDetailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
