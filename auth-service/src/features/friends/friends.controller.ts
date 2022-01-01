import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FriendsService } from './friends.service';
import { UserModel } from './../user/user.model';
import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UseAuthGuard } from '../auth/auth.guard';
import { User } from '../user/user.decorator';
import { AuthHeader, LangHeader } from 'src/open-api/decorators';
import { SuccessResponse } from '../../types/common';
import { GetFriendsResponse } from './types';

@ApiTags('friends')
@LangHeader()
@AuthHeader()
@Controller('friends')
@UseAuthGuard()
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @ApiOkResponse({
    description: 'List of all friends of a logged in user.',
    type: GetFriendsResponse,
  })
  @Get('/all')
  getFriends(@User() user: UserModel): Promise<GetFriendsResponse> {
    return this.friendsService.getFriends(user.userId);
  }

  @ApiOkResponse({
    description: 'List of all friends of a user.',
    type: GetFriendsResponse,
  })
  @Get('/all/:id')
  getUserFriends(@Param('id') id: string): Promise<GetFriendsResponse> {
    return this.friendsService.getFriends(id);
  }

  @ApiOkResponse({
    description: 'Friend removed succesfully',
    type: SuccessResponse,
  })
  @Delete('/:id')
  removeFrind(@User() user: UserModel, @Param('id') id: string) {
    return this.friendsService.removeFriends(user.userId, id);
  }
}
