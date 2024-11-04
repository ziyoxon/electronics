import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./model/product.entity";
import { Categoria } from "../categoria/model/categoria.model";

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productModel.create(createProductDto);
  }
  
  async findAll() {
    return await this.productModel.findAll({
      include: {all: true}, 
    });
  }

  async findOne(id: number) {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const [updated] = await this.productModel.update(updateProductDto, {
      where: { id },
      returning: true,
    });
    if (!updated) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updated[0];
  }

  async remove(id: number) {
    const product = await this.productModel.destroy({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return { message: `Product with ID ${id} has been removed` };
  }
}
