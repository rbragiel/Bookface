import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FriendsService } from './friends.service';
import { UserModel } from './../user/user.model';
import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UseAuthGuard } from '../auth/auth.guard';
import { User } from '../user/user.decorator';

@ApiTags('friends')
@Controller('friends')
@UseAuthGuard()
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @ApiOkResponse({
    description: 'List of all friends is returned.',
  })
  @Get('/all')
  getFriends(@User() user: UserModel) {
    return this.friendsService.getFriends(user.userId);
  }

  @ApiOkResponse({
    description: 'Info about friend is returned.',
  })
  @Get('/:id')
  getFriend(@User() user: UserModel, @Param('id') id: string) {
    return this.friendsService.getFriend(user.userId, id);
  }

  @ApiOkResponse({ description: 'Friend removed succesfully' })
  @Delete('/:id')
  removeFrind(@User() user: UserModel, @Param('id') id: string) {
    return this.friendsService.removeFriends(user.userId, id);
  }
}
