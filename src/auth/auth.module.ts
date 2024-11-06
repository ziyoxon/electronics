import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AdminModule } from "../admin/admin.module";
import { JwtModule } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";
import { Admin } from "../admin/models/admin.model";
import { UserModule } from "../user/user.module";
import { User } from "../user/models/user.model";
@Module({
  imports: [
    SequelizeModule.forFeature([Admin,User]),
    JwtModule.register({global: true}),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule],
})
export class AuthModule {}
