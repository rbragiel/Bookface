import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.decorator';
import { InvitationService } from './invitation.service';
import { UserModel } from '../user/user.model';
import { UseAuthGuard } from '../auth/auth.guard';

@ApiTags('invitations')
@Controller('/invitations')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Get('all/invited')
  @UseAuthGuard()
  getAllInvitations(@User() user: UserModel) {
    return this.invitationService.getAllInvitations(user);
  }

  @Get('all/invitees')
  @UseAuthGuard()
  getInvitees(@User() user: UserModel) {
    return this.invitationService.getAllInvitees(user);
  }

  @Delete('invite/:id')
  @UseAuthGuard()
  deleteInvite(@User() user: UserModel, @Param('id') id: string) {
    return this.invitationService.deleteInvite(user, id);
  }

  @Post('invite/:id')
  @UseAuthGuard()
  invite(@User() user: UserModel, @Param('id') id: string) {
    return this.invitationService.invite(user, id);
  }

  @Post('reject/:id')
  @UseAuthGuard()
  reject(@User() user: UserModel, @Param('id') id: string) {
    return this.invitationService.reject(user, id);
  }

  @Post('accept/:id')
  @UseAuthGuard()
  accept(@User() user: UserModel, @Param('id') id: string) {
    return this.invitationService.accept(user, id);
  }
}
