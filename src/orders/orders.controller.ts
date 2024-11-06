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
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { AdminSelfGuard } from "../guards/admin_self.guard";

@ApiTags("Order")
@Controller("order")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: "Yangi buyurtma yaratish" })
  @ApiResponse({
    status: 201,
    description: "Buyurtma muvaffaqiyatli yaratildi.",
  })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar kiritildi." })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha buyurtmalarni olish" })
  @ApiResponse({ status: 200, description: "Buyurtmalar ro'yxati." })
  findAll() {
    return this.ordersService.findAll();
  }

  @Post("findByPrice")
  async findByPrice(@Body() orderDto: CreateOrderDto) {
    return await this.ordersService.findByAnyPrice(orderDto);
  }

  @Get(":id")
  @ApiOperation({ summary: "Buyurtmani ID orqali olish" })
  @ApiParam({
    name: "id",
    description: "Buyurtma ID raqami",
    example: "1",
  })
  @ApiResponse({ status: 200, description: "Topilgan buyurtma ma'lumotlari." })
  @ApiResponse({ status: 404, description: "Buyurtma topilmadi." })
  findOne(@Param("id") id: string) {
    return this.ordersService.findOne(+id);
  }

  @UseGuards(AdminSelfGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Buyurtma ma'lumotlarini yangilash" })
  @ApiParam({
    name: "id",
    description: "Yangilanadigan buyurtma ID raqami",
    example: "1",
  })
  @ApiResponse({
    status: 200,
    description: "Buyurtma muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar kiritildi." })
  @ApiResponse({ status: 404, description: "Buyurtma topilmadi." })
  update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @UseGuards(AdminSelfGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Buyurtmani o'chirish" })
  @ApiParam({
    name: "id",
    description: "O'chiriladigan buyurtma ID raqami",
    example: "1",
  })
  @ApiResponse({
    status: 200,
    description: "Buyurtma muvaffaqiyatli o'chirildi.",
  })
  @ApiResponse({ status: 404, description: "Buyurtma topilmadi." })
  remove(@Param("id") id: string) {
    return this.ordersService.remove(+id);
  }
}
