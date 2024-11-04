import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsInt } from "class-validator";

export class CreateStatusDto {
  @ApiProperty({
    example: 10,
    description: "Miqdor",
  })
  @IsInt({ message: "Son formatida emas" })
  @IsNotEmpty({ message: "Miqdor yozilmadi" })
  quantity: number;

  @ApiProperty({
    example: "Ushbu kategoriya mavjud bo'lmagan mahsulotlar uchun",
    description: "Kategoriya tavsifi",
  })
  @IsString({ message: "String formatda emas" })
  @IsOptional() 
  description?: string; 
}
