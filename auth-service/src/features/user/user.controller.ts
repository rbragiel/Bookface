import { UserService } from './user.service';
import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthHeader, LangHeader } from '../../open-api/decorators';
import { UseAuthGuard } from '../auth/auth.guard';
import { UsersSearchResultDto } from './user.dto';

@ApiTags('user')
@LangHeader()
@AuthHeader()
@Controller('user')
@UseAuthGuard()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    description: 'List of all invited users.',
    type: UsersSearchResultDto,
  })
  @Get('/search')
  searchUser(
    @Query('query') query: string,
    @Query('page', new ParseIntPipe()) page: number,
  ) {
    return this.userService.searchUser(query, page);
  }
}
