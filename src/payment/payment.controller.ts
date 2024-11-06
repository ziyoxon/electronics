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
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { AdminSelfGuard } from "../guards/admin_self.guard";
import { AdminCreatorGuard } from "../guards/admin_creator.guard";

@ApiTags("Payment")
@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: "Yangi to'lov yaratish" })
  @ApiResponse({ status: 201, description: "To'lov muvaffaqiyatli yaratildi." })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar." })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha to'lovlarni olish" })
  @ApiResponse({ status: 200, description: "To'lovlar ro'yxati." })
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(":orderId/status")
  async getPaymentStatus(@Param("orderId") orderId: string) {
    const isPaid = await this.paymentService.checkPaymentStatus(orderId);
    return { orderId, isPaid };
  }

  @Get(":id")
  @ApiOperation({ summary: "ID orqali to'lovni olish" })
  @ApiParam({
    name: "id",
    description: "To'lovning unikal ID raqami",
    example: 1,
  })
  @ApiResponse({ status: 200, description: "Topilgan to'lov." })
  @ApiResponse({ status: 404, description: "To'lov topilmadi." })
  findOne(@Param("id") id: string) {
    return this.paymentService.findOne(+id);
  }


  @UseGuards(AdminCreatorGuard)
  @Patch(":id")
  @ApiOperation({ summary: "To'lovni yangilash" })
  @ApiParam({
    name: "id",
    description: "To'lovning unikal ID raqami",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "To'lov muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({ status: 404, description: "To'lov topilmadi." })
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @UseGuards(AdminCreatorGuard)
  @Delete(":id")
  @ApiOperation({ summary: "To'lovni o'chirish" })
  @ApiParam({
    name: "id",
    description: "To'lovning unikal ID raqami",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "To'lov muvaffaqiyatli o'chirildi.",
  })
  @ApiResponse({ status: 404, description: "To'lov topilmadi." })
  remove(@Param("id") id: string) {
    return this.paymentService.remove(+id);
  }
}
