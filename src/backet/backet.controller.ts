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
import { BacketService } from "./backet.service";
import { CreateBacketDto } from "./dto/create-backet.dto";
import { UpdateBacketDto } from "./dto/update-backet.dto";
import { AdminCreatorGuard } from "../guards/admin_creator.guard";

@ApiTags("Backet")
@Controller("backet")
export class BacketController {
  constructor(private readonly backetService: BacketService) {}

  @Post()
  @ApiOperation({ summary: "Yangi backet yaratish" })
  @ApiResponse({ status: 201, description: "Backet muvaffaqiyatli yaratildi." })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar." })
  create(@Body() createBacketDto: CreateBacketDto) {
    return this.backetService.create(createBacketDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha backetlarni olish" })
  @ApiResponse({ status: 200, description: "Backetlar ro'yxati." })
  findAll() {
    return this.backetService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Backetni ID orqali olish" })
  @ApiParam({
    name: "id",
    description: "Backetning unikal ID raqami",
    example: 1,
  })
  @ApiResponse({ status: 200, description: "Topilgan backet ma'lumotlari." })
  @ApiResponse({ status: 404, description: "Backet topilmadi." })
  findOne(@Param("id") id: string) {
    return this.backetService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Backet ma'lumotlarini yangilash" })
  @ApiParam({
    name: "id",
    description: "Backetning unikal ID raqami",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Backet muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar." })
  @ApiResponse({ status: 404, description: "Backet topilmadi." })
  update(@Param("id") id: string, @Body() updateBacketDto: UpdateBacketDto) {
    return this.backetService.update(+id, updateBacketDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Backetni o'chirish" })
  @ApiParam({
    name: "id",
    description: "Backetning unikal ID raqami",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Backet muvaffaqiyatli o'chirildi.",
  })
  @ApiResponse({ status: 404, description: "Backet topilmadi." })
  remove(@Param("id") id: string) {
    return this.backetService.remove(+id);
  }
}
