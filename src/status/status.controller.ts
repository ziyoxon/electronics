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
import { StatusService } from "./status.service";
import { CreateStatusDto } from "./dto/create-status.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";

@ApiTags("Status")
@Controller("status")
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  @ApiOperation({ summary: "Yangi status yaratish" })
  @ApiResponse({ status: 201, description: "Status muvaffaqiyatli yaratildi." })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar." })
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha statuslarni olish" })
  @ApiResponse({ status: 200, description: "Statuslar ro'yxati." })
  findAll() {
    return this.statusService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Statusni ID orqali olish" })
  @ApiParam({
    name: "id",
    description: "Statusga tegishli unikal ID raqami",
    example: 1,
  })
  @ApiResponse({ status: 200, description: "Topilgan status ma'lumotlari." })
  @ApiResponse({ status: 404, description: "Status topilmadi." })
  findOne(@Param("id") id: string) {
    return this.statusService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Status ma'lumotlarini yangilash" })
  @ApiParam({
    name: "id",
    description: "Statusga tegishli unikal ID raqami",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Status muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar." })
  @ApiResponse({ status: 404, description: "Status topilmadi." })
  update(@Param("id") id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusService.update(+id, updateStatusDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Statusni ID orqali o'chirish" })
  @ApiParam({
    name: "id",
    description: "Statusga tegishli unikal ID raqami",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Status muvaffaqiyatli o'chirildi.",
  })
  @ApiResponse({ status: 404, description: "Status topilmadi." })
  remove(@Param("id") id: string) {
    return this.statusService.remove(+id);
  }
}
