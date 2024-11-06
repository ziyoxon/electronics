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
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { AdminSelfGuard } from "../guards/admin_self.guard";

@ApiTags("Product")
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AdminSelfGuard)
  @Post()
  @ApiOperation({ summary: "Yangi mahsulot yaratish" })
  @ApiResponse({
    status: 201,
    description: "Mahsulot muvaffaqiyatli yaratildi.",
  })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar." })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha mahsulotlarni olish" })
  @ApiResponse({ status: 200, description: "Mahsulotlar ro'yxati." })
  findAll() {
    return this.productService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Mahsulotni ID orqali olish" })
  @ApiParam({
    name: "id",
    description: "Mahsulotga tegishli unikal ID raqami",
    example: 1,
  })
  @ApiResponse({ status: 200, description: "Topilgan mahsulot ma'lumotlari." })
  @ApiResponse({ status: 404, description: "Mahsulot topilmadi." })
  findOne(@Param("id") id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Mahsulot ma'lumotlarini yangilash" })
  @ApiParam({
    name: "id",
    description: "Mahsulotga tegishli unikal ID raqami",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Mahsulot muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar." })
  @ApiResponse({ status: 404, description: "Mahsulot topilmadi." })
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @UseGuards(AdminSelfGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Mahsulotni ID orqali o'chirish" })
  @ApiParam({
    name: "id",
    description: "Mahsulotga tegishli unikal ID raqami",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Mahsulot muvaffaqiyatli o'chirildi.",
  })
  @ApiResponse({ status: 404, description: "Mahsulot topilmadi." })
  remove(@Param("id") id: string) {
    return this.productService.remove(+id);
  }
}
