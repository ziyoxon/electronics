import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class ClientAccessTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers["authorization"];
    if (!authHeader) {
     throw new UnauthorizedException("Authorization header mavjud emas.");
;
    }

    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw new UnauthorizedException(
    "Token notogri formatda. Kutilayotgan format: 'Bearer <token>'."
    );
    }

    let decoded: any;
    try {
      decoded = this.jwtService.decode(token);
      request["user"] = decoded;
    } catch (error) {
      console.error(error);

      try {
        decoded = this.jwtService.verify(token, {
          secret: process.env.ACCESS_TOKEN_KEY,
        });
        request["user"] = decoded;
        console.log(decoded);
      } catch (error) {
        console.error(error);
        throw new UnauthorizedException("Invalid or expired token.");
      }
    }
    const method = request.method;
    if (
      decoded.role === "admin" ||
      (decoded.role === "superadmin" &&
        (method === "PATCH" || method === "DELETE"))
    ) {
      throw new UnauthorizedException(
    "Token notogri formatda. Kutilayotgan format: 'Bearer <token>'."
      );
    }

    const id = request.params?.id;
    if (id) {
      if (
        decoded.role === "admin" ||
        (decoded.role === "superadmin" && method === "GET")
      ) {
        return true;
      }
    }
    if (id && decoded.id != id) {
      throw new UnauthorizedException(
        "Admin foydalanuvchilariga client ma'lumotlarini ozgartirish yoki ochirishga ruxsat berilmaydi."
      );
    }
    return true;
  }
}
