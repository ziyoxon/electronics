import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UpdateDeliveryDto } from "./dto/update-delivery.dto";
import { Delivery } from "./model/delivery.model";
import { CreateDeliveryDto } from "./dto/create-delivery.dto";

@Injectable()
export class DeliveryService {
  constructor(@InjectModel(Delivery) private deliveryModel: typeof Delivery) {}

  async create(createDeliveryDto: CreateDeliveryDto) {
    const delivery = await this.deliveryModel.create(createDeliveryDto);
    return delivery;
  }

  async findAll() {
    return await this.deliveryModel.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    const delivery = await this.deliveryModel.findByPk(id);
    if (!delivery) {
      throw new NotFoundException(`Delivery with ID ${id} not found`);
    }
    return delivery;
  }

  async update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    const [updated] = await this.deliveryModel.update(updateDeliveryDto, {
      where: { id },
      returning: true,
    });
    if (!updated) {
      throw new NotFoundException(`Delivery with ID ${id} not found`);
    }
    return updated[0];
  }

  async remove(id: number) {
    const deleted = await this.deliveryModel.destroy({ where: { id } });
    if (!deleted) {
      throw new NotFoundException(`Delivery with ID ${id} not found`);
    }
    return { message: `Delivery with ID ${id} has been removed` };
  }
}
