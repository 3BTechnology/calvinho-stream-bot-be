import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { secret } from '../config/vars';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['token'];

    if (!token) {
      return false;
    }

    const decodedToken = this.jwtService.verify(token, { secret: secret });
    request.user = decodedToken;
    return true;
  }
}
