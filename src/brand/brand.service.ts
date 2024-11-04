import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";
import { Brand } from "./models/brand.model";

@Injectable()
export class BrandService {
  constructor(@InjectModel(Brand) private brandModel: typeof Brand) {}

  async create(createBrandDto: CreateBrandDto) {
    const brand = await this.brandModel.create(createBrandDto);
    return brand;
  }

  async findAll() {
    return await this.brandModel.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    const brand = await this.brandModel.findByPk(id);
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    return brand;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const [updated] = await this.brandModel.update(updateBrandDto, {
      where: { id },
      returning: true,
    });
    if (!updated) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    return updated[0]; 
  }

  async remove(id: number) {
    const deleted = await this.brandModel.destroy({ where: { id } });
    if (!deleted) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    return { message: `Brand with ID ${id} has been removed` };
  }
}
