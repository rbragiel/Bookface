import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { UserModel } from '../user/user.model';
import { Invitation } from './invitation.model';
import { TranslationsKeys } from '../../contants/i18n';

@Injectable()
export class InvitationService {
  private readonly logger = new Logger('Invitation service');
  constructor(
    @InjectModel(Invitation) private readonly invitation: typeof Invitation,
  ) {}

  private limit = 30;

  async getAllInvitations(user: UserModel) {
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
            exclude: [
              'password',
              'updatedAt',
              'role',
              'description',
              'isActivated',
              'birthday',
            ],
          },
        },
      ],
      limit: this.limit,
    });

    return invited;
  }

  async getAllInvitees(user: UserModel) {
    const invitees = await this.invitation.findAll({
      where: { inviteeId: user.userId },
      attributes: {
        exclude: ['inviterId', 'inviteeId'],
      },
      include: [
        {
          association: 'inviter',
          attributes: {
            exclude: [
              'password',
              'updatedAt',
              'role',
              'description',
              'isActivated',
              'birthday',
            ],
          },
        },
      ],
    });

    return invitees;
  }

  async invite(user: UserModel, inviteeId: string) {
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

    return invitation.id;
  }

  async accept(user: UserModel, invitationId: string) {
    const invitation = await this.invitation.findOne({
      where: { invitationId, inviteeId: user.userId },
    });

    if (!invitation) {
      throw new BadRequestException({
        message: TranslationsKeys.invitationNotExisting,
      });
    }

    await invitation.destroy();

    this.logger.log('Invitation accepted successfully');

    return { success: true };
  }

  async reject(user: UserModel, invitationId: string) {
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

  async deleteInvite(user: UserModel, inviteId: string) {
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
