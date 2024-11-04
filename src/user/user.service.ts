import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Response } from "express";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly jwtService: JwtService
  ) {}
  // Token yaratish
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

  async refreshTokenUSer(id: number, refresh_token: string, res: Response) {
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
      return { token };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userModel.findOne({
      where: { login: createUserDto.login },
    });

    if (user) {
      throw new BadRequestException("Bunday user mavjud");
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
      message: "User muvaffaqiyatli ro'yxatdan o'tkazildi",
      user: newUser,
      access_token: tokens.access_token,
    };
  }

  findAll() {
    return this.userModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.userModel.findOne({ where: { id }, include: { all: true } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.update(updateUserDto, {
      where: { id },
      returning: true,
    });
    return updatedUser[1][0];
  }

  async remove(id: number) {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      return { message: `ID: ${id} bo'yicha foydalanuvchi mavjud emas` };
    }
    await this.userModel.destroy({ where: { id } });
    return {
      message: `ID: ${id} bo'yicha foydalanuvchi muvaffaqiyatli o'chirildi`,
    };
  }
}
