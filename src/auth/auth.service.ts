import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "../admin/models/admin.model";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import * as uuid from "uuid";
import { Response } from "express";
import { SignInDto } from "./dto/signin-auth.dto";
import { User } from "../user/models/user.model";
import { CreateUserDto } from "../user/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin) private adminModel: typeof Admin,
    @InjectModel(User) private userModel: typeof User,
    private readonly jwtService: JwtService,

  ) {}

  //===================== ADMIN ======================
  async generateToken(admin: Admin) {
    const payload = {
      id: admin.id,
      login: admin.login,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { access_token, refresh_token };
  }

  async refreshTokenAdmin(id: number, refresh_token: string, res: Response) {
    try {
      const verified_token = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      if (!verified_token) {
        throw new UnauthorizedException("Unauthorized token");
      }
      if (id != verified_token.id) {
        throw new ForbiddenException("Forbidden admin");
      }
      const payload = { id: verified_token.id, login: verified_token.login };
      const token = this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      });
      return {
        token,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async adminSignUp(createAdminDto: CreateAdminDto, res: Response) {
    const admin = await this.adminModel.findOne({
      where: { login: createAdminDto.login },
    });

    if (admin) {
      throw new BadRequestException("Bunday admin mavjud");
    }

    if (createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password,
    });
    const tokens = await this.generateToken(newAdmin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedAdmin = await this.adminModel.update(
      { hashed_refresh_token },
      { where: { id: newAdmin.id }, returning: true }
    );
    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    return {
      message: "Admin muvaffaqiyatli ro'yxatdan o'tkazildi",
      admin: updatedAdmin,
      access_token: tokens.access_token,
    };
  }

  async adminSignIn(adminSignInDto: SignInDto, res: Response) {
    const { login, password } = adminSignInDto;
    const admin = await this.adminModel.findOne({
      where: { login },
    });

    if (!admin) {
      throw new UnauthorizedException("Admin topilmadi");
    }

    const validPassword = await bcrypt.compare(password, admin.hashed_password);
    if (!validPassword) {
      throw new UnauthorizedException("Noto'g'ri parol");
    }

    const tokens = await this.generateToken(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    await this.adminModel.update(
      { is_active: true, hashed_refresh_token },
      { where: { id: admin.id } }
    );
    return res.json({
      message: "Tizimga muvaffaqiyatli kirildi",
      access_token: tokens.access_token,
    });
  }

  async adminSignOut(refreshToken: string, res: Response, id: number) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const admin = await this.adminModel.findOne({
        where: { id: payload.id },
      });
      if (!admin) {
        throw new UnauthorizedException("This admin not found");
      }

      if (id !== admin.id) {
        throw new BadRequestException("This another admin");
      }

      const valid_refresh_token = await bcrypt.compare(
        refreshToken,
        admin.hashed_refresh_token
      );
      if (!valid_refresh_token) {
        throw new UnauthorizedException("So'rovda xatolik");
      }

      res.clearCookie("refresh_token", {
        httpOnly: true,
      });

      await this.adminModel.update(
        { hashed_refresh_token: "" }, // Data to update
        { where: { id: payload.id } } // Options object with `where` clause
      );

      return { message: "Admin success signout", id: payload.id };
    } catch (error) {
      throw new BadRequestException("Internal server error");
    }
  }

  //-------------------------------------USER----------------------

  async generateTokenUser(user: User) {
    const payload = {
      id: user.id,
      login: user.login,
      is_active: user.is_active,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { access_token, refresh_token };
  }

  async refreshTokenUser(id: number, refresh_token: string, res: Response) {
    try {
      const verified_token = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      if (!verified_token) {
        throw new UnauthorizedException("Unauthorized token");
      }

      if (id != verified_token.id) {
        throw new ForbiddenException("Forbidden user");
      }

      const payload = { id: verified_token.id, login: verified_token.login };
      const token = this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      });

      return {
        token,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async userSignUp(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userModel.findOne({
      where: { login: createUserDto.login },
    });

    if (user) {
      throw new BadRequestException("Bunday foydalanuvchi mavjud");
    }

    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }

    const hashed_password = await bcrypt.hash(createUserDto.password, 7);
    const newUser = await this.userModel.create({
      ...createUserDto,
      hashed_password,
    });

    const tokens = await this.generateTokenUser(newUser);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    await this.userModel.update(
      { hashed_refresh_token },
      { where: { id: newUser.id }, returning: true }
    );

    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    return {
      message: "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tkazildi",
      user: newUser,
      access_token: tokens.access_token,
    };
  }

  async userSignIn(userSignInDto: SignInDto, res: Response) {
    const { login, password } = userSignInDto;

    try {
      const user = await this.userModel.findOne({
        where: { login },
      });

      if (!user) {
        throw new UnauthorizedException("Foydalanuvchi topilmadi.");
      }

      const validPassword = await bcrypt.compare(
        password,
        user.hashed_password
      );
      if (!validPassword) {
        throw new UnauthorizedException("Noto'g'ri parol.");
      }

      const tokens = await this.generateTokenUser(user);
      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

      res.cookie("refresh_token", tokens.refresh_token, {
        httpOnly: true,
        maxAge: +process.env.REFRESH_TIME_MS,
      });

      await this.userModel.update(
        { is_active: true, hashed_refresh_token },
        { where: { id: user.id } }
      );

      return res.json({
        message: "Tizimga muvaffaqiyatli kirildi.",
        access_token: tokens.access_token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Ichki server xatosi." });
    }
  }

  async userSignOut(refreshToken: string, res: Response, id: number) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const user = await this.userModel.findOne({
        where: { id: payload.id },
      });

      if (!user) {
        throw new UnauthorizedException("Bu foydalanuvchi topilmadi.");
      }

      if (id !== user.id) {
        throw new BadRequestException("Boshqa foydalanuvchi.");
      }

      const valid_refresh_token = await bcrypt.compare(
        refreshToken,
        user.hashed_refresh_token
      );

      if (!valid_refresh_token) {
        throw new UnauthorizedException("So'rovda xatolik.");
      }

      res.clearCookie("refresh_token", {
        httpOnly: true,
      });

      await this.userModel.update(
        { hashed_refresh_token: "" },
        { where: { id: payload.id } }
      );

      return { message: "Foydalanuvchi tizimdan chiqdi.", id: payload.id };
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Ichki server xatosi." });
    }
  }
}