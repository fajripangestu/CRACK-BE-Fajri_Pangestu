import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository){}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  getAllProducts(){
    return this.productsRepository.getAllProducts();
  }

  getOneProductById(id: number){
    return this.productsRepository.getOneProductById(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
