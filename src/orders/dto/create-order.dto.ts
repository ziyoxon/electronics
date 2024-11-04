import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean } from "class-validator";

export class CreateOrderDto {


  @ApiProperty({
    description: "Buyurtma narxi",
    example: "150000",
  })
  @IsNumber()
  @IsNotEmpty({ message: "Narxni kiritish majburiy" })
  price: number;

  @ApiProperty({
    description: "Yetkazib berish turi",
    example: "Courier",
  })
  @IsString()
  @IsNotEmpty({ message: "Yetkazib berish turini kiritish majburiy" })
  delivery_type: string;

  @ApiProperty({
    description: "Buyurtma berilgan sana",
    example: "2024-11-05",
    required: false,
  })
  @IsString()
  @IsOptional()
  order_given_date: string;
}
