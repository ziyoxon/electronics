import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { DiscountService } from "./discount.service";
import { CreateDiscountDto } from "./dto/create-discount.dto";
import { UpdateDiscountDto } from "./dto/update-discount.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("Discount")
@Controller("discount")
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  @ApiOperation({ summary: "Yangi chegirma yaratish" })
  @ApiResponse({
    status: 201,
    description: "Chegirma muvaffaqiyatli yaratildi.",
  })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar kiritildi." })
  create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountService.create(createDiscountDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha chegirmalarni olish" })
  @ApiResponse({ status: 200, description: "Chegirmalar ro'yxati." })
  findAll() {
    return this.discountService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Chegirmani ID orqali olish" })
  @ApiParam({
    name: "id",
    description: "Chegirma ID raqami",
    example: "1",
  })
  @ApiResponse({ status: 200, description: "Topilgan chegirma ma'lumotlari." })
  @ApiResponse({ status: 404, description: "Chegirma topilmadi." })
  findOne(@Param("id") id: string) {
    return this.discountService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Chegirma ma'lumotlarini yangilash" })
  @ApiParam({
    name: "id",
    description: "Yangilanadigan chegirma ID raqami",
    example: "1",
  })
  @ApiResponse({
    status: 200,
    description: "Chegirma muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar kiritildi." })
  @ApiResponse({ status: 404, description: "Chegirma topilmadi." })
  update(
    @Param("id") id: string,
    @Body() updateDiscountDto: UpdateDiscountDto
  ) {
    return this.discountService.update(+id, updateDiscountDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Chegirmani o'chirish" })
  @ApiParam({
    name: "id",
    description: "O'chiriladigan chegirma ID raqami",
    example: "1",
  })
  @ApiResponse({
    status: 200,
    description: "Chegirma muvaffaqiyatli o'chirildi.",
  })
  @ApiResponse({ status: 404, description: "Chegirma topilmadi." })
  remove(@Param("id") id: string) {
    return this.discountService.remove(+id);
  }
}
