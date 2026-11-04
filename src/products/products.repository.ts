import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getAllProducts() {
    return this.prisma.product_name.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  getOneProductById(id: string) {
    return `This is product ${id} from repository`;
  }
}
