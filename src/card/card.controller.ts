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
import { CardService } from "./card.service";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";

@ApiTags("Card")
@Controller("card")
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @ApiOperation({ summary: "Yangi karta yaratish" })
  @ApiResponse({ status: 201, description: "Karta muvaffaqiyatli yaratildi." })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar." })
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardService.create(createCardDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha kartalarni olish" })
  @ApiResponse({ status: 200, description: "Kartalar ro'yxati." })
  findAll() {
    return this.cardService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Kartaning ID orqali ma'lumotini olish" })
  @ApiParam({
    name: "id",
    description: "Kartaga tegishli unikal ID raqami",
    example: 1,
  })
  @ApiResponse({ status: 200, description: "Topilgan karta ma'lumotlari." })
  @ApiResponse({ status: 404, description: "Karta topilmadi." })
  findOne(@Param("id") id: string) {
    return this.cardService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Karta ma'lumotlarini yangilash" })
  @ApiParam({
    name: "id",
    description: "Kartaga tegishli unikal ID raqami",
    example: 1,
  })
  @ApiResponse({ status: 200, description: "Karta muvaffaqiyatli yangilandi." })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar." })
  @ApiResponse({ status: 404, description: "Karta topilmadi." })
  update(@Param("id") id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(+id, updateCardDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Kartaning ID orqali o'chirish" })
  @ApiParam({
    name: "id",
    description: "Kartaga tegishli unikal ID raqami",
    example: 1,
  })
  @ApiResponse({ status: 200, description: "Karta muvaffaqiyatli o'chirildi." })
  @ApiResponse({ status: 404, description: "Karta topilmadi." })
  remove(@Param("id") id: string) {
    return this.cardService.remove(+id);
  }
}
