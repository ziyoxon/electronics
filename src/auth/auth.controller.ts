import {
  Controller,
  Post,
  Body,
  Res,
  Param,
  HttpStatus,
  Req,
  UseGuards,
  Get,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Admin } from "../admin/models/admin.model";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { Response, Request } from "express";
import { AdminCreatorGuard } from "../guards/admin_creator.guard";
import { SignInDto } from "./dto/signin-auth.dto";
import { CookieGetter } from "../decorator/cookie.getter";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { User } from "../user/models/user.model";
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {}

  @Post("signup")
  @ApiOperation({ summary: "Yangi admin qo'shish (is_creator yarata oladi)" })
  @ApiResponse({
    status: 201,
    description: "Create Admin",
    type: Admin,
  })
  async adminSignUp(
    @Body() createAdminDto: CreateAdminDto,
    @Res() res: Response
  ) {
    const result = await this.authService.adminSignUp(createAdminDto, res);
    return res.status(201).json(result);
  }

  @Post("signin")
  @ApiOperation({ summary: "Admin tizimga kirish" })
  @ApiResponse({
    status: 200,
    description: "Admin signin",
    type: Admin,
  })
  async adminSignIn(@Body() adminSignInDto: SignInDto, @Res() res: Response) {
    return this.authService.adminSignIn(adminSignInDto, res);
  }

  @ApiOperation({ summary: "ma'lumotlarni tokenga o'zgartirish" })
  @Post("/refresh/:id")
  async refreshToken(
    @Param("id") id: number,
    @CookieGetter("refresh_token") refresh_token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenAdmin(id, refresh_token, res);
  }

  @Post("signout/:id")
  @ApiOperation({ summary: "Admin tizimdan chiqishi" })
  @ApiResponse({
    status: 200,
    description: "Admin signout",
  })
  async adminSignOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Param("id") id: string
  ) {
    const refreshToken = req.cookies["refresh_token"];

    return this.authService.adminSignOut(refreshToken, res, +id);
  }

  //---------------------------USerr-----------

  @Post("signup_user")
  @ApiOperation({ summary: "Yangi User qo'shish " })
  @ApiResponse({
    status: 201,
    description: "Create User",
    type: Admin,
  })
  async userSignUp(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response
  ) {
    const result = await this.authService.userSignUp(createUserDto, res);
    return res.status(201).json(result);
  }

  @Post("signin_user")
  @ApiOperation({ summary: "User tizimga kirish" })
  @ApiResponse({
    status: 200,
    description: "User signin",
    type: User,
  })
  async userSignIn(@Body() userSignInDto: SignInDto, @Res() res: Response) {
    return this.authService.userSignIn(userSignInDto, res);
  }

  @ApiOperation({ summary: "ma'lumotlarni tokenga o'zgartirish" })
  @Post("/refresh     /:id")
  async refreshTokenUser(
    @Param("id") id: number,
    @CookieGetter("refresh_token") refresh_token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenUser(id, refresh_token, res);
  }

  @Post("signout/:id")
  @ApiOperation({ summary: "User tizimdan chiqishi" })
  @ApiResponse({
    status: 200,
    description: "User signout",
  })
  async userSignOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Param("id") id: string
  ) {
    const refreshToken = req.cookies["refresh_token"];

    return this.authService.userSignOut(refreshToken, res, +id);
  }
}
