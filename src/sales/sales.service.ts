import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SalesRepository } from './sales.repository';

@Injectable()
export class SalesService {
  constructor(private readonly salesRepository: SalesRepository) {}
  create(createSaleDto: CreateSaleDto) {
    return 'This action adds a new sale';
  }

  getAllSales() {
    return this.salesRepository.getAllSales();
  }

  getOneSaleById(id: string) {
    return this.salesRepository.getOneSaleById(id);
  }

  update(id: string, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: string) {
    return `This action removes a #${id} sale`;
  }
}
