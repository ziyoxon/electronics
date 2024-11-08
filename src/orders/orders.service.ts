import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order } from "./models/order.model";
import { User } from "../user/models/user.model";
import { Op } from "sequelize";

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order) private orderModel: typeof Order) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = await this.orderModel.create(createOrderDto);
    return order;
  }

  async findAll() {
    return await this.orderModel.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    const order = await this.orderModel.findByPk(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const [updated] = await this.orderModel.update(updateOrderDto, {
      where: { id },
      returning: true,
    });
    if (!updated) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return updated[0];
  }
  async getPrice(orderId: number): Promise<number> {
    const order = await Order.findByPk(orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    return order.price;
  }

  async findByAnyPrice(orderDto: CreateOrderDto): Promise<Order[]> {
    const { price, start_date, end_date } = orderDto;
    const clientWhere: any = {};
    if (price) {
      clientWhere.price = { [Op.gt]: 5000 };
    }
    return this.orderModel.findAll({
      include: [
        {
          model: Order, 
          where: clientWhere,
        },
      ],
      where: {
        createdAt: {
          [Op.between]: [new Date(start_date), new Date(end_date)],
        },
      },
    });
  }

  async remove(id: number) {
    const deleted = await this.orderModel.destroy({ where: { id } });
    if (!deleted) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return { message: `Order with ID ${id} has been removed` };
  }
}
