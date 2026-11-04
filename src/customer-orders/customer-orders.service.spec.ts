import { Test, TestingModule } from '@nestjs/testing';
import { CustomerOrdersService } from './customer-orders.service';
import { CustomerOrdersRepository } from './customer-orders.repository';

describe('CustomerOrdersService', () => {
  let service: CustomerOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerOrdersService,
        {
          provide: CustomerOrdersRepository,
          useValue: { createCustomerOrder: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<CustomerOrdersService>(CustomerOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
