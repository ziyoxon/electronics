import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { CategoriaService } from "./categoria.service";
import { CreateCategoriaDto } from "./dto/create-categoria.dto";
import { UpdateCategoriaDto } from "./dto/update-categoria.dto";

@ApiTags("Categoria")
@Controller("categoria")
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  @ApiOperation({ summary: "Yangi kategoriya yaratish" })
  @ApiResponse({
    status: 201,
    description: "Kategoriya muvaffaqiyatli yaratildi.",
  })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar." })
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha kategoriyalarni olish" })
  @ApiResponse({ status: 200, description: "Kategoriyalar ro'yxati." })
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Kategoriyani ID orqali olish" })
  @ApiParam({
    name: "id",
    description: "Kategoriyaga tegishli unikal ID raqami",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Topilgan kategoriya ma'lumotlari.",
  })
  @ApiResponse({ status: 404, description: "Kategoriya topilmadi." })
  findOne(@Param("id") id: string) {
    return this.categoriaService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Kategoriya ma'lumotlarini yangilash" })
  @ApiParam({
    name: "id",
    description: "Kategoriyaga tegishli unikal ID raqami",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Kategoriya muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar." })
  @ApiResponse({ status: 404, description: "Kategoriya topilmadi." })
  update(
    @Param("id") id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto
  ) {
    return this.categoriaService.update(+id, updateCategoriaDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Kategoriyani ID orqali o'chirish" })
  @ApiParam({
    name: "id",
    description: "Kategoriyaga tegishli unikal ID raqami",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Kategoriya muvaffaqiyatli o'chirildi.",
  })
  @ApiResponse({ status: 404, description: "Kategoriya topilmadi." })
  remove(@Param("id") id: string) {
    return this.categoriaService.remove(+id);
  }
}
