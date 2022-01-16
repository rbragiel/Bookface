import { UserService } from './user.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthHeader, LangHeader } from '../../open-api/decorators';
import { AuthGuard, UseAuthGuard } from '../auth/auth.guard';
import {
  GetUserDto,
  UserDto,
  UsersSearchResultDto,
  UpdateSelfDto,
} from './user.dto';
import { User } from './user.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';

@ApiTags('user')
@LangHeader()
@AuthHeader()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    description: 'User updated',
    type: UserDto,
  })
  @UseAuthGuard()
  @Patch('/')
  @UseInterceptors(ClassSerializerInterceptor)
  updateSelf(@User() user: UserDto, @Body() body: UpdateSelfDto) {
    return this.userService.updateSelf(user, body);
  }

  @ApiOkResponse({
    description: 'Returns all users by ids',
    type: UsersSearchResultDto,
  })
  @UseAuthGuard()
  @Get('/all')
  @UseInterceptors(ClassSerializerInterceptor)
  getAllUsersByIds(@Body() body: { ids: string[] }) {
    return this.userService.getUsers(body.ids);
  }

  @ApiOkResponse({
    description: 'List of searched users.',
    type: UsersSearchResultDto,
  })
  @UseAuthGuard()
  @Get('/search')
  searchUser(
    @Query('query') query: string,
    @Query('page', new ParseIntPipe()) page: number,
  ) {
    return this.userService.searchUser(query, page);
  }

  @ApiOkResponse({
    description: 'User by id.',
    type: GetUserDto,
  })
  @UseAuthGuard()
  @Get('/:id')
  getUser(@Param('id') id: string, @User() user: UserDto) {
    return this.userService.getUser(id, user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteById(id);
  }

  // @UseGuards(AuthGuard, RolesGuard)
  // @Patch('/:userId')
  // updateUser(@User('userId') userId: string) {
  //   return this.userService.updateUser(userId);
  // }
}
