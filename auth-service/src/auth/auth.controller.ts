import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
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
  async register(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<{ success: boolean }> {
    return this.authService.register(userRegisterDto);
  }

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() userLoginDto: UserLoginDto): Promise<UserWithToken> {
    return this.authService.validate(userLoginDto);
  }

  @Post('activate')
  @UseInterceptors(ClassSerializerInterceptor)
  async activate(@Query('token') token: string): Promise<UserWithToken> {
    return this.authService.activate(token);
  }
}
