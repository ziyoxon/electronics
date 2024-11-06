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
import { BrandService } from "./brand.service";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";
import { AdminSelfGuard } from "../guards/admin_self.guard";

@ApiTags("Brand")
@Controller("brand")
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @ApiOperation({ summary: "Yangi brand yaratish" })
  @ApiResponse({ status: 201, description: "Brand muvaffaqiyatli yaratildi." })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar." })
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha brandlarni olish" })
  @ApiResponse({ status: 200, description: "Brandlar ro'yxati." })
  findAll() {
    return this.brandService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Brandni ID orqali olish" })
  @ApiParam({
    name: "id",
    description: "Brandning unikal ID raqami",
    example: 1,
  })
  @ApiResponse({ status: 200, description: "Topilgan brand ma'lumotlari." })
  @ApiResponse({ status: 404, description: "Brand topilmadi." })
  findOne(@Param("id") id: string) {
    return this.brandService.findOne(+id);
  }


  @UseGuards(AdminSelfGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Brand ma'lumotlarini yangilash" })
  @ApiParam({
    name: "id",
    description: "Brandning unikal ID raqami",
    example: 1,
  })
  @ApiResponse({ status: 200, description: "Brand muvaffaqiyatli yangilandi." })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar." })
  @ApiResponse({ status: 404, description: "Brand topilmadi." })
  update(@Param("id") id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(+id, updateBrandDto);
  }

  @UseGuards(AdminSelfGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Brandni o'chirish" })
  @ApiParam({
    name: "id",
    description: "Brandning unikal ID raqami",
    example: 1,
  })
  @ApiResponse({ status: 200, description: "Brand muvaffaqiyatli o'chirildi." })
  @ApiResponse({ status: 404, description: "Brand topilmadi." })
  remove(@Param("id") id: string) {
    return this.brandService.remove(+id);
  }
}
