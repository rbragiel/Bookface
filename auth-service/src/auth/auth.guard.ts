/* eslint-disable @typescript-eslint/no-unused-vars */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { AppRequest } from '../types/request';
import { UserModel } from '../user/user.model';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = <AppRequest>context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return false;
    }

    const [bearer, token] = authHeader.split(' ');

    if (!token || bearer !== 'Bearer') {
      return false;
    }

    try {
      const {
        iat: _,
        exp: __,
        ...rest
      } = await this.jwtService.verifyAsync(token);

      const user = plainToClass(UserModel, rest);
      request.user = user;
      return true;
    } catch (error) {
      return false;
    }
  }
}
