import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.decorator';
import { InvitationService } from './invitation.service';
import { UserModel } from '../user/user.model';
import { UseAuthGuard } from '../auth/auth.guard';
import { LangHeader, AuthHeader } from '../../open-api/decorators';
import { SuccessResponse } from '../../types/common';
import { InvitedResponse, InviteesResponse } from './types';

@ApiTags('invitations')
@LangHeader()
@AuthHeader()
@Controller('invitations')
@UseAuthGuard()
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @ApiOkResponse({
    description: 'List of all invited users.',
    type: InvitedResponse,
  })
  @Get('all/invited')
  getAllInvitations(@User() user: UserModel): Promise<InvitedResponse> {
    return this.invitationService.getAllInvited(user);
  }

  @ApiOkResponse({
    description: 'List of all users who sent invitation',
    type: InviteesResponse,
  })
  @Get('all/invitees')
  getInvitees(@User() user: UserModel): Promise<InviteesResponse> {
    return this.invitationService.getAllInvitees(user);
  }

  @ApiOkResponse({
    description: 'Invitation deleted successfully.',
    type: SuccessResponse,
  })
  @Delete('invite/:id')
  deleteInvite(@User() user: UserModel, @Param('id') id: string) {
    return this.invitationService.deleteInvite(user, id);
  }

  @ApiCreatedResponse({ description: 'Invitation created.' })
  @Post('invite/:id')
  invite(@User() user: UserModel, @Param('id') id: string) {
    return this.invitationService.invite(user, id);
  }

  @ApiCreatedResponse({
    description: 'Invitation rejected.',
    type: SuccessResponse,
  })
  @Post('reject/:id')
  reject(@User() user: UserModel, @Param('id') id: string) {
    return this.invitationService.reject(user, id);
  }

  @ApiCreatedResponse({
    description: 'Invitation accepted, new friends pair was created.',
    type: SuccessResponse,
  })
  @Post('accept/:id')
  accept(@User() user: UserModel, @Param('id') id: string) {
    return this.invitationService.accept(user, id);
  }
}
