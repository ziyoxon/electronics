import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize"; // Sequelize orqali bazaga ulanish
import { CreateUserDiscountDto } from "./dto/create-user_discount.dto";
import { UpdateUserDiscountDto } from "./dto/update-user_discount.dto";
import { UserDiscount } from "./models/user_discount.models";

@Injectable()
export class UserDiscountService {
  constructor(
    @InjectModel(UserDiscount) private userDiscountModel: typeof UserDiscount // Modelni ulaymiz
  ) {}

  async create(createUserDiscountDto: CreateUserDiscountDto) {
    const userDiscount = await this.userDiscountModel.create(
      createUserDiscountDto
    );
    return userDiscount;
  }

  async findAll() {
    return await this.userDiscountModel.findAll({
      include: { all: true }, 
    });
  }

  async findOne(id: number) {
    const userDiscount = await this.userDiscountModel.findByPk(id);
    if (!userDiscount) {
      throw new NotFoundException(`UserDiscount with ID ${id} not found`); // Xatolikni qaytarish
    }
    return userDiscount;
  }

  async update(id: number, updateUserDiscountDto: UpdateUserDiscountDto) {
    const [updated] = await this.userDiscountModel.update(
      updateUserDiscountDto,
      {
        where: { id },
        returning: true, 
      }
    );
    if (!updated) {
      throw new NotFoundException(`UserDiscount with ID ${id} not found`); // Xatolikni qaytarish
    }
    return updated[0]; 
  }

  async remove(id: number) {
    const deleted = await this.userDiscountModel.destroy({ where: { id } });
    if (!deleted) {
      throw new NotFoundException(`UserDiscount with ID ${id} not found`); // Xatolikni qaytarish
    }
    return { message: `UserDiscount with ID ${id} has been removed` }; // O'chirish muvaffaqiyatli bo'lganini xabar qilish
  }
}
