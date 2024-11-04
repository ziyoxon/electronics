import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { OtpService } from "./otpemail.service";
import { Otp } from "./otp-admin";
import { OtpController } from "./otp_controller";

@Module({
  imports: [SequelizeModule.forFeature([Otp])],
  providers: [OtpService],
  controllers: [OtpController],
})
export class OtpModule {}
