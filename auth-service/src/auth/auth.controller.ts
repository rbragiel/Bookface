import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Patch,
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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

class RegisterResponse {
  @ApiProperty()
  success: boolean;
}

@ApiTags('auth')
@ApiHeader({
  name: 'Accept-Language',
  description: 'Language which all messages will be in',
})
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    description: 'Currently logged user',
    type: UserModel,
  })
  @ApiForbiddenResponse({
    description: 'Unauthorized. User is authorized to access this resource',
  })
  @Get('me')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  me(@Request() request: AppRequest): UserModel {
    return request.user;
  }

  @ApiCreatedResponse({
    description: 'User registered successfully',
    type: RegisterResponse,
  })
  @ApiBadRequestResponse({
    description: 'Account already exists or validation errors',
  })
  @Post('register')
  async register(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<{ success: boolean }> {
    return this.authService.register(userRegisterDto);
  }

  @ApiCreatedResponse({
    description: 'User is returned',
    type: UserWithToken,
  })
  @ApiUnauthorizedResponse({
    description: 'Account does not exist or password is wrong',
  })
  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() userLoginDto: UserLoginDto): Promise<UserWithToken> {
    return this.authService.validate(userLoginDto);
  }

  @ApiOkResponse({
    description: 'Account activated successfully',
    type: UserWithToken,
  })
  @ApiForbiddenResponse({
    description: 'Account cannot be found or token expired',
  })
  @Patch('activate')
  @UseInterceptors(ClassSerializerInterceptor)
  async activate(@Query('token') token: string): Promise<UserWithToken> {
    return this.authService.activate(token);
  }
}
