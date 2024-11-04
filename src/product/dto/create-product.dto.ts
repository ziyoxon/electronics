import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
} from "class-validator";

export class CreateProductDto {
  @ApiProperty({
    example: "BrandName",
    description: "Mahsulot brendi",
  })
  @IsString({ message: "String formatda emas" })
  @IsNotEmpty({ message: "Brend yozilmadi" })
  brand: string;

  @ApiProperty({
    example: "SeriaName",
    description: "Mahsulot seriyasi",
  })
  @IsString({ message: "String formatda emas" })
  @IsNotEmpty({ message: "Seria yozilmadi" })
  seria: string;

  @ApiProperty({
    example: "Qizil",
    description: "Mahsulot rangi",
  })
  @IsString({ message: "String formatda emas" })
  @IsNotEmpty({ message: "Rang yozilmadi" })
  color: string;

  @ApiProperty({
    example: 100,
    description: "Mahsulot narxi",
  })
  @IsNumber({}, { message: "Narx raqam formatda emas" })
  @IsNotEmpty({ message: "Narx yozilmadi" })
  price: number;

  @ApiProperty({
    example: 10,
    description: "Mahsulot uchun chegirma",
  })
  @IsNumber({}, { message: "Chegirma raqam formatda emas" })
  @IsOptional()
  discount?: number;

  @ApiProperty({
    example: "Bu namunali mahsulot.",
    description: "Mahsulot haqida batafsil ma'lumot",
  })
  @IsOptional()
  @IsString({ message: "String formatda emas" })
  info?: string;

  @ApiProperty({
    example: true,
    description: "Mahsulot faolligi",
  })
  @IsBoolean()
  is_active?: boolean;

}
