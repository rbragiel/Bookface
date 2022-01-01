import { AuthHeader } from 'src/open-api/decorators';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserModel, UserWithToken } from '../user/user.model';
import { AuthService } from './auth.service';
import { UserRegisterDto, UserLoginDto } from '../user/user.dto';
import { UseAuthGuard } from './auth.guard';
import { User } from '../user/user.decorator';
import { LangHeader } from '../../open-api/decorators';

class RegisterResponse {
  @ApiProperty()
  success: boolean;
}

@ApiTags('auth')
@LangHeader()
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    description: 'Currently logged user.',
    type: UserModel,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. User is authorized to access this resource.',
  })
  @AuthHeader()
  @Get('me')
  @UseAuthGuard()
  @UseInterceptors(ClassSerializerInterceptor)
  me(@User() user: UserModel): UserModel {
    return user;
  }

  @ApiCreatedResponse({
    description: 'User registered successfully.',
    type: RegisterResponse,
  })
  @ApiBadRequestResponse({
    description: 'Account already exists or validation errors.',
  })
  @Post('register')
  async register(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<{ success: boolean }> {
    return this.authService.register(userRegisterDto);
  }

  @ApiCreatedResponse({
    description: 'User is returned.',
    type: UserWithToken,
  })
  @ApiUnauthorizedResponse({
    description: 'Account does not exist or password is wrong.',
  })
  @ApiForbiddenResponse({
    description:
      "User logged in succesfully, but haven't activated account by an email",
  })
  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() userLoginDto: UserLoginDto): Promise<UserWithToken> {
    return this.authService.validate(userLoginDto);
  }

  @ApiOkResponse({
    description: 'Account activated successfully.',
    type: UserWithToken,
  })
  @ApiBadRequestResponse({
    description: 'Account cannot be found or token expired.',
  })
  @Post('activate')
  @UseInterceptors(ClassSerializerInterceptor)
  async activate(@Query('token') token: string): Promise<UserWithToken> {
    return this.authService.activate(token);
  }
}
