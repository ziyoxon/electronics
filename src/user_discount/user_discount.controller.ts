import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { UserDiscountService } from "./user_discount.service";
import { CreateUserDiscountDto } from "./dto/create-user_discount.dto";
import { UpdateUserDiscountDto } from "./dto/update-user_discount.dto";
import { AdminSelfGuard } from "../guards/admin_self.guard";

@ApiTags("User Discount")
@Controller("user_discount")
export class UserDiscountController {
  constructor(private readonly userDiscountService: UserDiscountService) {}

  @Post()
  @ApiOperation({ summary: "Yangi foydalanuvchi chegirmasi yaratish" })
  @ApiResponse({
    status: 201,
    description: "Foydalanuvchi chegirmasi muvaffaqiyatli yaratildi.",
  })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar." })
  create(@Body() createUserDiscountDto: CreateUserDiscountDto) {
    return this.userDiscountService.create(createUserDiscountDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha foydalanuvchi chegirmalarini olish" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi chegirmalari ro'yxati.",
  })
  findAll() {
    return this.userDiscountService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Foydalanuvchi chegirmasini ID orqali olish" })
  @ApiParam({
    name: "id",
    description: "Foydalanuvchi chegirmasiga tegishli unikal ID raqami",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Topilgan foydalanuvchi chegirmasi ma'lumotlari.",
  })
  @ApiResponse({
    status: 404,
    description: "Foydalanuvchi chegirmasi topilmadi.",
  })
  findOne(@Param("id") id: string) {
    return this.userDiscountService.findOne(+id);
  }

  @UseGuards(AdminSelfGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Foydalanuvchi chegirmasini yangilash" })
  @ApiParam({
    name: "id",
    description: "Foydalanuvchi chegirmasiga tegishli unikal ID raqami",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi chegirmasi muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar." })
  @ApiResponse({
    status: 404,
    description: "Foydalanuvchi chegirmasi topilmadi.",
  })
  update(
    @Param("id") id: string,
    @Body() updateUserDiscountDto: UpdateUserDiscountDto
  ) {
    return this.userDiscountService.update(+id, updateUserDiscountDto);
  }


  @UseGuards(AdminSelfGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Foydalanuvchi chegirmasini o'chirish" })
  @ApiParam({
    name: "id",
    description: "Foydalanuvchi chegirmasiga tegishli unikal ID raqami",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi chegirmasi muvaffaqiyatli o'chirildi.",
  })
  @ApiResponse({
    status: 404,
    description: "Foydalanuvchi chegirmasi topilmadi.",
  })
  remove(@Param("id") id: string) {
    return this.userDiscountService.remove(+id);
  }
}
