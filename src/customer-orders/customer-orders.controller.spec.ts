import { Test, TestingModule } from '@nestjs/testing';
import { CustomerOrdersController } from './customer-orders.controller';
import { CustomerOrdersService } from './customer-orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

describe('CustomerOrdersController', () => {
  let controller: CustomerOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerOrdersController],
      providers: [
        {
          provide: CustomerOrdersService,
          useValue: { createCustomerOrder: jest.fn() },
        },
        { provide: JwtAuthGuard, useValue: { canActivate: jest.fn(() => true) } },
      ],
    }).compile();

    controller = module.get<CustomerOrdersController>(CustomerOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
