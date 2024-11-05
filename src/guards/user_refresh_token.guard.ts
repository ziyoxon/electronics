import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Request } from "express";

@Injectable()
export class ClientRefreshTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const refreshToken = request.cookies["refresh_token"];
    console.log(refreshToken);

    if (!refreshToken) {
      throw new UnauthorizedException("RefreshToken  mavjud emas.");
    }

    const payload = this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    console.log(request.params.id);
    console.log(payload);

    request["user"] = payload;
    return true;
  }
}
