import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateOrderDetailDto } from "./dto/create-order_detail.dto";
import { UpdateOrderDetailDto } from "./dto/update-order_detail.dto";
import { OrderDetail } from "./models/order_detail.model";
import { OrdersService } from "../orders/orders.service";

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectModel(OrderDetail) private orderDetailModel: typeof OrderDetail,
    private orderService: OrdersService
  ) {}

  async create(createOrderDetailDto: CreateOrderDetailDto) {
    const orderDetail =
      await this.orderDetailModel.create(createOrderDetailDto);
    const price = await this.orderService.getPrice(orderDetail.order_id);
    const total_price = price * orderDetail.quantity;
    orderDetail.total_price = total_price;
    await orderDetail.save();

    return orderDetail;
  }

  async findAll() {
    return await this.orderDetailModel.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    const orderDetail = await this.orderDetailModel.findByPk(id);
    if (!orderDetail) {
      throw new NotFoundException(`OrderDetail with ID ${id} not found`);
    }
    return orderDetail;
  }

  async update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    const [updated] = await this.orderDetailModel.update(updateOrderDetailDto, {
      where: { id },
      returning: true,
    });
    if (!updated) {
      throw new NotFoundException(`OrderDetail with ID ${id} not found`);
    }
    return updated[0];
  }

  async remove(id: number) {
    const deleted = await this.orderDetailModel.destroy({ where: { id } });
    if (!deleted) {
      throw new NotFoundException(`OrderDetail with ID ${id} not found`);
    }
    return { message: `OrderDetail with ID ${id} has been removed` };
  }
}
