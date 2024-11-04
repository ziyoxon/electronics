import { PartialType } from '@nestjs/swagger';
import { CreateUserDiscountDto } from './create-user_discount.dto';

export class UpdateUserDiscountDto extends PartialType(CreateUserDiscountDto) {}
