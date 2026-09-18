import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SalesRepository } from './sales.repository';

@Injectable()
export class SalesService {
  constructor(private readonly salesRepository: SalesRepository){}
  create(createSaleDto: CreateSaleDto) {
    return 'This action adds a new sale';
  }

  getAllSales(){
    return this.salesRepository.getAllSales();
  }

  getOneSaleById(id: number){
    return this.salesRepository.getOneSaleById(id);
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
