import { Body, Controller, Post } from "@nestjs/common";
import { OtpService } from "./otpemail.service";
import { OtpDto } from "./dto/otp-dto";

@Controller("otp")
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post("send")
  async sendOtp(@Body("email") email: string) {
    return this.otpService.generateAndSendOtp(email);
  }
  
  @Post("verify")
  async verifyOtp(@Body() otpDto: OtpDto) {
    const { email, otp } = otpDto;
    return this.otpService.verifyOtp(email, otp);
  }
}
