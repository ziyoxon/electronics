import { Module } from '@nestjs/common';
import { UserDiscountService } from './user_discount.service';
import { UserDiscountController } from './user_discount.controller';
import { UserDiscount } from './models/user_discount.models';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports:[SequelizeModule.forFeature([UserDiscount])],
  controllers: [UserDiscountController],
  providers: [UserDiscountService],
})
export class UserDiscountModule {}
