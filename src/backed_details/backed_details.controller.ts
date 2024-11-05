import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { BackedDetailsService } from './backed_details.service';
import { CreateBackedDetailDto } from './dto/create-backed_detail.dto';
import { UpdateBackedDetailDto } from './dto/update-backed_detail.dto';
import { AdminCreatorGuard } from '../guards/admin_creator.guard';

@ApiTags('Backed Details')
@Controller('backed_details')
export class BackedDetailsController {
  constructor(private readonly backedDetailsService: BackedDetailsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi backed detail yaratish" })
  @ApiResponse({ status: 201, description: "Backed detail muvaffaqiyatli yaratildi." })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar." })
  create(@Body() createBackedDetailDto: CreateBackedDetailDto) {
    return this.backedDetailsService.create(createBackedDetailDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha backed detail'larni olish" })
  @ApiResponse({ status: 200, description: "Backed detail'lar ro'yxati." })
  findAll() {
    return this.backedDetailsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Backed detail'ni ID orqali olish" })
  @ApiParam({
    name: 'id',
    description: 'Backed detailga tegishli unikal ID raqami',
    example: 1,
  })
  @ApiResponse({ status: 200, description: "Topilgan backed detail ma'lumotlari." })
  @ApiResponse({ status: 404, description: "Backed detail topilmadi." })
  findOne(@Param('id') id: string) {
    return this.backedDetailsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Backed detail ma'lumotlarini yangilash" })
  @ApiParam({
    name: 'id',
    description: 'Backed detailga tegishli unikal ID raqami',
    example: 1,
  })
  @ApiResponse({ status: 200, description: "Backed detail muvaffaqiyatli yangilandi." })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar." })
  @ApiResponse({ status: 404, description: "Backed detail topilmadi." })
  update(@Param('id') id: string, @Body() updateBackedDetailDto: UpdateBackedDetailDto) {
    return this.backedDetailsService.update(+id, updateBackedDetailDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Backed detail'ni ID orqali o'chirish" })
  @ApiParam({
    name: 'id',
    description: 'Backed detailga tegishli unikal ID raqami',
    example: 1,
  })
  @ApiResponse({ status: 200, description: "Backed detail muvaffaqiyatli o'chirildi." })
  @ApiResponse({ status: 404, description: "Backed detail topilmadi." })
  remove(@Param('id') id: string) {
    return this.backedDetailsService.remove(+id);
  }
}
