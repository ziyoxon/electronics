import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class CreateBacketDto {
  @ApiProperty({
    example: 100.0,
    description: "Savatchadagi umumiy narx",
  })
  @IsNumber({}, { message: "Umumiy narx raqam bo'lishi kerak" })
  @IsNotEmpty({ message: "Umumiy narx kiritilmagan" })
  total_price: number;

  
}
