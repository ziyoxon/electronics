import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Response } from "express";
import { CookieGetter } from "../decorator/cookie.getter";
import { Otp } from "../OTP/otp-admin";
import { AdminSelfGuard } from "../guards/admin_self.guard";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  
  @Post("signin")
  @ApiOperation({ summary: "Yangi user yaratish" })
  @ApiResponse({ status: 201, description: "User yaratildi." })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar." })
  create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    return this.userService.create(createUserDto, res);
  }

  @ApiOperation({ summary: "Tokenni yangilash" })
  @Post("/refreshToken/:id")
  async refreshToken(
    @Param("id") id: number,
    @CookieGetter("refresh_token") refresh_token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.userService.refreshTokenUSer(id, refresh_token, res);
  }

  @Get()
  @ApiOperation({ summary: "Barcha userlarni olish" })
  @ApiResponse({ status: 200, description: "Userlar ro'yxati." })
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Userni ID orqali olish" })
  @ApiParam({
    name: "id",
    description: "Userning unikal ID raqami",
    example: 1,
  })
  @ApiResponse({ status: 200, description: "Topilgan user ma'lumotlari." })
  @ApiResponse({ status: 404, description: "User topilmadi." })
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(AdminSelfGuard)
  @Patch(":id")
  @ApiOperation({ summary: "User ma'lumotlarini yangilash" })
  @ApiParam({
    name: "id",
    description: "Userning unikal ID raqami",
    example: 1,
  })
  @ApiResponse({ status: 200, description: "User muvaffaqiyatli yangilandi." })
  @ApiResponse({ status: 400, description: "Xato ma'lumotlar." })
  @ApiResponse({ status: 404, description: "User topilmadi." })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(AdminSelfGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Userni o'chirish" })
  @ApiParam({
    name: "id",
    description: "Userning unikal ID raqami",
    example: 1,
  })
  @ApiResponse({ status: 200, description: "User muvaffaqiyatli o'chirildi." })
  @ApiResponse({ status: 404, description: "User topilmadi." })
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
