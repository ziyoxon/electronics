import { IsString, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDetailDto {
  @ApiProperty({
    description: "Buyurtma tafsiloti haqida ma'lumot",
    example: "Bu yerda mahsulotning tavsifi keltiriladi",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: "Mahsulotning miqdori",
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    description: "Buyurtmaning umumiy narxi",
    example: 100.5,
  })
  @IsNumber()
  @IsNotEmpty()
  total_price: number;
}