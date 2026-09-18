import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class DimensionsRepository{
    constructor(private readonly prisma: PrismaService){}

    getAllDimensions(){
        return this.prisma.dimension.findMany();
    }

    getOneDimensionById(id: number){
        return this.prisma.dimension.findUnique(
            {
                where: {id: id}
            }
        );
    }
}