import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { DeliveryService } from "./delivery.service";
import { CreateDeliveryDto } from "./dto/create-delivery.dto";
import { UpdateDeliveryDto } from "./dto/update-delivery.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("delivery")
@Controller("delivery")
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  @ApiOperation({ summary: "Yangi yetkazib berishni yaratish" })
  @ApiResponse({
    status: 201,
    description: "Yetkazib berish muvaffaqiyatli yaratildi.",
  })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar." })
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveryService.create(createDeliveryDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha yetkazib berishlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha yetkazib berishlar ro'yxati.",
  })
  findAll() {
    return this.deliveryService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID orqali yetkazib berishni olish" })
  @ApiParam({
    name: "id",
    description: "Yetkazib berishning unikal ID raqami",
    example: 1,
  })
  @ApiResponse({ status: 200, description: "Topilgan yetkazib berish." })
  @ApiResponse({ status: 404, description: "Yetkazib berish topilmadi." })
  findOne(@Param("id") id: string) {
    return this.deliveryService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Yetkazib berishni yangilash" })
  @ApiParam({
    name: "id",
    description: "Yetkazib berishning unikal ID raqami",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Yetkazib berish muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar." })
  @ApiResponse({ status: 404, description: "Yetkazib berish topilmadi." })
  update(
    @Param("id") id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto
  ) {
    return this.deliveryService.update(+id, updateDeliveryDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Yetkazib berishni o'chirish" })
  @ApiParam({
    name: "id",
    description: "Yetkazib berishning unikal ID raqami",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Yetkazib berish muvaffaqiyatli o'chirildi.",
  })
  @ApiResponse({ status: 404, description: "Yetkazib berish topilmadi." })
  remove(@Param("id") id: string) {
    return this.deliveryService.remove(+id);
  }
}
