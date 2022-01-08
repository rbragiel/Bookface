import { UserService } from './user.service';
import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthHeader, LangHeader } from '../../open-api/decorators';
import { UseAuthGuard } from '../auth/auth.guard';
import { GetUserDto, UserDto, UsersSearchResultDto } from './user.dto';
import { User } from './user.decorator';

@ApiTags('user')
@LangHeader()
@AuthHeader()
@Controller('user')
@UseAuthGuard()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    description: 'List of searched users.',
    type: UsersSearchResultDto,
  })
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
  @Get('/:id')
  getUser(@Param('id') id: string, @User() user: UserDto) {
    return this.userService.getUser(id, user);
  }
}
