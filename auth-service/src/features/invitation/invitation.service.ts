import { UserDto } from './../user/user.dto';
import { FriendsService } from './../friends/friends.service';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Invitation } from './invitation.model';
import { TranslationsKeys } from '../../contants/i18n';
import { SuccessResponse } from '../../types/common';
import { IniviteResponse, InvitedResponse, InviteesResponse } from './types';

@Injectable()
export class InvitationService {
  private readonly logger = new Logger('Invitation service');
  constructor(
    @InjectModel(Invitation) private readonly invitation: typeof Invitation,
    private readonly friendsService: FriendsService,
  ) {}

  private limit = 30;

  private excludeOptions = [
    'password',
    'updatedAt',
    'role',
    'description',
    'isActivated',
    'birthday',
  ];

  async getAllInvited(user: UserDto): Promise<InvitedResponse> {
    const invited = await this.invitation.findAll({
      where: { inviterId: user.userId },
      attributes: {
        include: ['invitationId'],
        exclude: ['inviterId', 'inviteeId'],
      },
      include: [
        {
          association: 'invitee',
          attributes: {
            exclude: this.excludeOptions,
          },
        },
      ],
      limit: this.limit,
    });

    return { invited } as InvitedResponse;
  }

  async getAllInvitees(user: UserDto): Promise<InviteesResponse> {
    const invitees = await this.invitation.findAll({
      where: { inviteeId: user.userId },
      attributes: {
        exclude: ['inviterId', 'inviteeId'],
      },
      include: [
        {
          association: 'inviter',
          attributes: {
            exclude: this.excludeOptions,
          },
        },
      ],
      limit: this.limit,
    });

    return { invitees } as InviteesResponse;
  }

  async invite(user: UserDto, inviteeId: string): Promise<IniviteResponse> {
    if (user.userId === inviteeId) {
      throw new BadRequestException({
        message: TranslationsKeys.cannotInviteSelf,
      });
    }

    const isInviteExisting = await this.invitation.findOne({
      where: {
        [Op.or]: [
          {
            inviteeId: user.userId,
            inviterId: inviteeId,
          },
          {
            inviteeId: inviteeId,
            inviterId: user.userId,
          },
        ],
      },
    });

    if (isInviteExisting) {
      throw new BadRequestException({
        message: TranslationsKeys.userAlreadyInvited,
      });
    }

    const _invitation = await this.invitation.create({
      inviterId: user.userId,
      inviteeId,
    });

    this.logger.log('Invitation created successfully');

    const invitation = _invitation.get({ plain: true });

    return new IniviteResponse(invitation.invitationId as string);
  }

  async accept(user: UserDto, invitationId: string): Promise<SuccessResponse> {
    const invitation = await this.invitation.findOne({
      where: { invitationId, inviteeId: user.userId },
    });

    if (!invitation) {
      throw new BadRequestException({
        message: TranslationsKeys.invitationNotExisting,
      });
    }

    await this.friendsService.createFriends(user.userId, invitation.inviterId);

    await invitation.destroy();

    this.logger.log('Invitation accepted successfully');

    return { success: true };
  }

  async reject(user: UserDto, invitationId: string): Promise<SuccessResponse> {
    const invitation = await this.invitation.findOne({
      where: { invitationId, inviteeId: user.userId },
    });

    if (!invitation) {
      this.logger.log('No such invitation');
      throw new BadRequestException({
        message: TranslationsKeys.invitationNotExisting,
      });
    }

    await invitation.destroy();

    this.logger.log('Invitation rejected successfully');

    return { success: true };
  }

  async deleteInvite(
    user: UserDto,
    inviteId: string,
  ): Promise<SuccessResponse> {
    const invitation = await this.invitation.findOne({
      where: { invitationId: inviteId, inviterId: user.userId },
    });

    if (!invitation) {
      this.logger.log('No such invitation');
      throw new BadRequestException({
        message: TranslationsKeys.invitationNotExisting,
      });
    }

    await invitation.destroy();

    this.logger.log('Invitation deleted successfully');

    return { success: true };
  }
}
