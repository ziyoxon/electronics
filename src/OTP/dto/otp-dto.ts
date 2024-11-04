import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class OtpDto {
  @IsEmail({}, { message: "Iltimos, to'g'ri email formatini kiriting." })
  email: string;

  @IsString({ message: "OTP string bo'lishi kerak." })
  @IsNotEmpty({ message: "OTP maydoni bo'sh bo'lmasligi kerak." })
  @Length(4, 4, { message: "OTP 4 raqamdan iborat bo'lishi kerak." })
  otp: string;

  expiration_time: Date;

  verified: boolean;
}
