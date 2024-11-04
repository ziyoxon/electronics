import { IsString, IsNotEmpty, IsOptional, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateDiscountDto {
  @ApiProperty({
    description: "Chegirma kodi",
    required: false,
    example: 1234,
  })
  @IsInt()
  @IsOptional()
  code?: number;

  @ApiProperty({
    description: "Chegirma taqdimoti",
    required: false,
    example: "20% chegirma",
  })
  @IsString()
  @IsOptional()
  present?: string;

  @ApiProperty({
    description: "Chegirma amal qilish boshlanish sanasi (timestamp)",
    required: false,
    example: 1633046400,
  })
  @IsInt()
  @IsOptional()
  from_date?: number;

  @ApiProperty({
    description: "Chegirma amal qilish tugash sanasi (timestamp)",
    required: false,
    example: 1635724800,
  })
  @IsInt()
  @IsOptional()
  to_date: number;
}
