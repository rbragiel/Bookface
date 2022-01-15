import { UserService } from './user.service';
import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthHeader, LangHeader } from '../../open-api/decorators';
import { AuthGuard, UseAuthGuard } from '../auth/auth.guard';
import { GetUserDto, UserDto, UsersSearchResultDto } from './user.dto';
import { User } from './user.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';

@ApiTags('user')
@LangHeader()
@AuthHeader()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
}
