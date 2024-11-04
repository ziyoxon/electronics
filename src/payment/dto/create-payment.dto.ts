import { IsBoolean, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
  @ApiProperty({
    description: "To'lov holati (to'langan/bo'sh).",
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  is_paid: boolean;
}
