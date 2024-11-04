import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsDateString } from "class-validator";

export class CreateCardDto {
  @ApiProperty({
    description: "Karta raqami",
    example: "1234-5678-9876-5432",
  })
  @IsString()
  @IsNotEmpty({ message: "Karta raqami bo'sh bo'lmasligi kerak" })
  card_number: string;

  @ApiProperty({
    description: "Karta berilgan sana",
    example: "2024-11-04",
  })
  @IsString()
  given_date: string;

  @ApiProperty({
    description: "Karta amal qilish muddati",
    example: "2028-11-04",
  })
  @IsString()
  expiration_date: string;
}
