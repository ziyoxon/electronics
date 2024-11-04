import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateBrandDto {
  @ApiProperty({
    description: "Brend nomi",
    example: "Apple",
  })
  @IsString()
  @IsNotEmpty({ message: "Brend nomi majburiy" })
  name: string;

  @ApiProperty({
    description: "Brend tavsifi",
    example: "Bu texnologiya va elektronika kompaniyasi",
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: "Brend logosi URL manzili",
    example: "https://example.com/logo.png",
    required: false,
  })
  @IsString()
  @IsOptional()
  logo_url: string;
}
