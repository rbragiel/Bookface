import { UserWithCreatedAt } from './../user/user.model';
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AppRequest } from '../../types/request';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = <AppRequest>context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return false;
    }

    console.log(authHeader);

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

      if (!rest.userId) {
        return false;
      }

      const user = await this.userService.findById(rest.userId, {
        attributes: { exclude: ['password'] },
      });

      if (!user) {
        return false;
      }

      request.user = <UserWithCreatedAt>user.get({ plain: true });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const UseAuthGuard = () => UseGuards(AuthGuard);
