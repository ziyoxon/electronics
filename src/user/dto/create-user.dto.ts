import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsEmail, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: "Foydalanuvchining to'liq ismi",
    example: "Abdullayev Abdulla",
  })
  @IsString({ message: "To'liq ism string bo'lishi kerak" })
  @Length(3, 50, { message: "Ism uzunligi 3 dan 50 gacha bo'lishi kerak" })
  full_name: string;

  @ApiProperty({ description: "Foydalanuvchi login", example: "user123" })
  @IsString({ message: "Login satr bo'lishi kerak" })
  @Length(3, 20, { message: "Login uzunligi 3 dan 20 gacha bo'lishi kerak" })
  login: string;

  @ApiProperty({
    description: "Foydalanuvchining email manzili",
    example: "user@example.com",
  })
  @IsEmail({}, { message: "To'g'ri email manzilini kiriting" })
  email: string;

  @ApiProperty({ description: "Parol", example: "P@ssw0rd" })
  @IsString({ message: "Parol satr bo'lishi kerak" })
  @Length(8, 100, {
    message: "Parol uzunligi kamida 8 belgidan iborat bo'lishi kerak",
  })
  password: string;

  @ApiProperty({ description: "Parolni tasdiqlash", example: "P@ssw0rd" })
  @IsString({ message: "Tasdiqlovchi parol satr bo'lishi kerak" })
  confirm_password: string;

  @ApiProperty({
    description: "Foydalanuvchining aktiv holati",
    default: false,
  })
  @IsBoolean({ message: "Aktiv holat 'true' yoki 'false' bo'lishi kerak" })
  is_active?: boolean;
}
