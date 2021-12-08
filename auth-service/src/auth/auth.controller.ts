import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserModel, UserWithToken } from '../user/user.model';
import { AuthService } from './auth.service';
import { UserRegisterDto, UserLoginDto } from '../user/user.dto';
import { AppRequest } from '../types/request';
import { AuthGuard } from './auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  me(@Request() request: AppRequest): UserModel {
    return request.user;
  }

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() userRegisterDto: UserRegisterDto): Promise<UserModel> {
    return this.authService.register(userRegisterDto);
  }

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() userLoginDto: UserLoginDto): Promise<UserWithToken> {
    return this.authService.validate(userLoginDto);
  }
}
