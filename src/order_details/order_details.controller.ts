import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UpdateOrderDetailDto } from "./dto/update-order_detail.dto";
import { OrderDetailsService } from "./order_details.service";
import { CreateOrderDetailDto } from "./dto/create-order_detail.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("Order Details")
@Controller("order_detail")
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi buyurtma tafsilotini yaratish" })
  @ApiResponse({
    status: 201,
    description: "Buyurtma tafsiloti muvaffaqiyatli yaratildi.",
  })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar." })
  create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailsService.create(createOrderDetailDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha buyurtma tafsilotlarini olish" })
  @ApiResponse({ status: 200, description: "Buyurtma tafsilotlari ro'yxati." })
  findAll() {
    return this.orderDetailsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID orqali buyurtma tafsilotini olish" })
  @ApiParam({
    name: "id",
    description: "Buyurtma tafsilotining unikal ID raqami",
    example: 1,
  })
  @ApiResponse({ status: 200, description: "Topilgan buyurtma tafsiloti." })
  @ApiResponse({ status: 404, description: "Buyurtma tafsiloti topilmadi." })
  findOne(@Param("id") id: string) {
    return this.orderDetailsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Buyurtma tafsilotlarini yangilash" })
  @ApiParam({
    name: "id",
    description: "Buyurtma tafsilotining unikal ID raqami",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Buyurtma tafsiloti muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar." })
  @ApiResponse({ status: 404, description: "Buyurtma tafsiloti topilmadi." })
  update(
    @Param("id") id: string,
    @Body() updateOrderDetailDto: UpdateOrderDetailDto
  ) {
    return this.orderDetailsService.update(+id, updateOrderDetailDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Buyurtma tafsilotini o'chirish" })
  @ApiParam({
    name: "id",
    description: "Buyurtma tafsilotining unikal ID raqami",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Buyurtma tafsiloti muvaffaqiyatli o'chirildi.",
  })
  @ApiResponse({ status: 404, description: "Buyurtma tafsiloti topilmadi." })
  remove(@Param("id") id: string) {
    return this.orderDetailsService.remove(+id);
  }
}
