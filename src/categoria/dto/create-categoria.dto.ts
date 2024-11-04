import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoriaDto {
  @ApiProperty({
    example: "Elektronika",
    description: "Kategoriya nomi",
  })
  @IsString({ message: "String formatda emas" })
  @IsNotEmpty({ message: "Kategoriya nomi yozilmadi" })
  name: string;

  @ApiProperty({
    example: "category_image.png",
    description: "Kategoriya rasmi",
  })
  @IsString({ message: "String formatda emas" })
  image: string;
  

  
}
