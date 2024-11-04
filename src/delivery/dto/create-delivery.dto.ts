import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateDeliveryDto {
  @ApiProperty({
    description: "Yetkazib berish manzili",
    example: "Toshkent, 123 ko'cha",
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: "Aloqa raqami", example: "+998901234567" })
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({ description: "Yetkazib berish sanasi", example: "2024-11-04" })
  @IsString()
  delivery_date: string;

  @ApiProperty({ description: "Yetkazib berish vaqti", example: "14:00" })
  @IsString()
  @IsNotEmpty()
  delivery_time: string;

  @ApiProperty({
    description: "Yetkazib berish holati",
    example: "Pending",
    required: false,
  })
  @IsString()
  @IsOptional()
  delivery_status: string;
}
