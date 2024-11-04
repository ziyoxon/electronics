import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBackedDetailDto {
  @ApiProperty({
    example: 2,
    description: "Mahsulotning miqdori",
  })
  @IsNumber({}, { message: "Miqdor raqam bo'lishi kerak" })
  @IsNotEmpty({ message: "Miqdor kiritilishi kerak" })
  quantity: number;

  @ApiProperty({
    example: "Qo'shimcha ma'lumot",
    description: "Mahsulot haqida tavsif",
  })
  @IsString({ message: "Tavsif string formatda bo'lishi kerak" })
  @IsOptional()
  description?: string;

}
