import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateCategoriaDto } from "./dto/create-categoria.dto";
import { UpdateCategoriaDto } from "./dto/update-categoria.dto";
import { Categoria } from "./model/categoria.model";
import { Product } from "../product/model/product.entity";

@Injectable()
export class CategoriaService {
  constructor(
    @InjectModel(Categoria) private categoriaModel: typeof Categoria
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    const categoria = await this.categoriaModel.create(createCategoriaDto);
    return categoria;
  }

  async findAll() {
    return await this.categoriaModel.findAll({
      include: {all:true}, 
    });
  }

  async findOne(id: number) {
    const categoria = await this.categoriaModel.findByPk(id);
    if (!categoria) {
      throw new NotFoundException(`Categoria with ID ${id} not found`);
    }
    return categoria;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const [updated] = await this.categoriaModel.update(updateCategoriaDto, {
      where: { id },
      returning: true,
    });
    if (!updated) {
      throw new NotFoundException(`Categoria with ID ${id} not found`);
    }
    return updated[0];
  }

  async remove(id: number) {
    const deleted = await this.categoriaModel.destroy({ where: { id } });
    if (!deleted) {
      throw new NotFoundException(`Categoria with ID ${id} not found`);
    }
    return { message: `Categoria with ID ${id} has been removed` };
  }
}
