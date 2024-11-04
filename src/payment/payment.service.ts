import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { Payment } from "./models/payment.models";

@Injectable()
export class PaymentService {
  constructor(@InjectModel(Payment) private paymentModel: typeof Payment) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return await this.paymentModel.create(createPaymentDto);
  }

  async findAll() {
    return await this.paymentModel.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentModel.findByPk(id);
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async checkPaymentStatus(orderId: string): Promise<boolean> {
    const payment = await this.paymentModel.findOne({
      where: { order_id: orderId },
    });

    if (!payment) {
      throw new NotFoundException(`Payment for order ID ${orderId} not found`);
    }

    return payment.is_paid;
  }

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto
  ): Promise<Payment> {
    const [updated] = await this.paymentModel.update(updatePaymentDto, {
      where: { id },
      returning: true,
    });
    if (!updated) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return updated[0];
  }

  async remove(id: number): Promise<{ message: string }> {
    const deleted = await this.paymentModel.destroy({ where: { id } });
    if (!deleted) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return { message: `Payment with ID ${id} has been removed` };
  }
}
