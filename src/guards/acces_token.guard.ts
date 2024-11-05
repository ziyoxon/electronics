import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AdminAccessTGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>("isPublic", [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers["authorization"];

    if (!authHeader) {
      throw new UnauthorizedException(
        "Authorization header yo'q, token berilmagan"
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new UnauthorizedException("Noto'g'ri token formati");
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.ADMIN_ACCESS_TOKEN_KEY,
      });

      payload["accessToken"] = token;
      request.user = payload;
      return true; 
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException("Token noto'g'ri yoki muddatidan o'tgan");
    }
  }
}
