import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import * as otpGenerator from "otp-generator";
import * as nodemailer from "nodemailer";
import { addMinute } from "../helpers/otp-helper";
import { Otp } from "./otp-admin";


@Injectable()
export class OtpService {
  async generateAndSendOtp(email: string) {
    const otp = otpGenerator.generate(4, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const now = new Date();
    const expiration_time = addMinute(now, 5);

    const newOtp = await Otp.create({
      id: uuidv4(),
      otp,
      email, 
      expiration_time,
      verified: false,
    });

    await this.sendOtpEmail(email, otp);

    return newOtp;
  }

  async sendOtpEmail(email: string, otp: string) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Sizning OTP Kodingiz",
      text: `Sizning OTP kodingiz: ${otp}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("OTP muvaffaqiyatli yuborildi!");
    } catch (error) {
      console.error("OTP yuborishda xato:", error);
    }
  }


  async verifyOtp(email: string, otpInput: string) {
    const otpRecord = await Otp.findOne({
      where: {
        email: email,
        otp: otpInput,
        verified: false, 
      },
    });
    if (!otpRecord) { 
      return {
        status: 'Failure',
        message: 'Invalid OTP or OTP has already been verified.',
      };
    }
    otpRecord.verified = true;
    await otpRecord.save();

    return {
      status: 'Success',
      message: 'OTP successfully verified.',
    };
  }

}
