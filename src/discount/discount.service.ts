import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateDiscountDto } from "./dto/create-discount.dto";
import { UpdateDiscountDto } from "./dto/update-discount.dto";
import { Discount } from "./models/discount.model";

@Injectable()
export class DiscountService {
  constructor(@InjectModel(Discount) private discountModel: typeof Discount) {}

  async create(createDiscountDto: CreateDiscountDto) {
    const discount = await this.discountModel.create(createDiscountDto);
    return discount;
  }

  async findAll() {
    return await this.discountModel.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    const discount = await this.discountModel.findByPk(id);
    if (!discount) {
      throw new NotFoundException(`Discount with ID ${id} not found`);
    }
    return discount;
  }

  async update(id: number, updateDiscountDto: UpdateDiscountDto) {
    const [updated] = await this.discountModel.update(updateDiscountDto, {
      where: { id },
      returning: true,
    });
    if (!updated) {
      throw new NotFoundException(`Discount with ID ${id} not found`);
    }
    return updated[0];
  }

  async remove(id: number) {
    const deleted = await this.discountModel.destroy({ where: { id } });
    if (!deleted) {
      throw new NotFoundException(`Discount with ID ${id} not found`);
    }
    return { message: `Discount with ID ${id} has been removed` };
  }
}
