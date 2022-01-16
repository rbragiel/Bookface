/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, Op } from 'sequelize';
import { TranslationsKeys } from '../../contants/i18n';
import {
  GetSingleUser,
  UpdateSelfDto,
  UserDto,
  UserRegisterDto,
  UserSearchDto,
  UsersSearchResultDto,
} from './user.dto';
import { User, UserRole } from './user.model';
import { FriendsService } from '../friends/friends.service';
import { Invitation } from '../invitation/invitation.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Invitation) private readonly invitation: typeof Invitation,
    private readonly friendsService: FriendsService,
  ) {}

  private searchUsersLimit = 15;

  private excludeOptions = [
    'password',
    'updatedAt',
    'role',
    'description',
    'isActivated',
    'birthday',
    'joined',
  ];

  private excludeGetSingleUserOptions = [
    'password',
    'updatedAt',
    'isActivated',
    'role',
  ];

  async create(user: UserRegisterDto) {
    const newUser = await this.userModel.create({
      ...user,
      role: UserRole.USER,
    });
    return newUser;
  }

  async findById(userId: string, options?: FindOptions) {
    const user = await this.userModel.findByPk(userId, options);
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({
      where: { email },
    });
    return user;
  }

  async findByNickname(nickname: string) {
    const user = await this.userModel.findOne({
      where: { nickname },
    });
    return user;
  }

  async searchUser(query: string, skip: number): Promise<UsersSearchResultDto> {
    const likeQuery = `%${query}%`;
    const users = await this.userModel.findAll({
      where: {
        [Op.or]: [
          {
            nickname: {
              [Op.like]: likeQuery,
            },
          },
          {
            email: {
              [Op.like]: likeQuery,
            },
          },
        ],
      },
      attributes: {
        exclude: this.excludeOptions,
      },
      limit: this.searchUsersLimit,
      offset: skip * this.searchUsersLimit,
    });

    return { users: users as UserSearchDto[] };
  }

  async deleteById(id: string) {
    return this.userModel.destroy({ where: { userId: id } });
  }

  async getUser(id: string, userDto: UserDto) {
    const user = await this.userModel.findByPk(id, {
      attributes: { exclude: this.excludeGetSingleUserOptions },
    });

    if (!user) {
      throw new BadRequestException({
        message: TranslationsKeys.cannotFindUser,
      });
    }

    const isInvitation = await this.invitation.findOne({
      where: {
        [Op.or]: [
          {
            inviterId: id,
            inviteeId: userDto.userId,
          },
          {
            inviterId: userDto.userId,
            inviteeId: id,
          },
        ],
      },
    });

    const areFriends = await this.friendsService.findFriendsPair(
      userDto.userId,
      id,
    );

    const response = {
      ...user.get({ plain: true }),
      areFriends: !!areFriends,
      isInviter: isInvitation && isInvitation.inviterId === id,
      isInvitee: isInvitation && isInvitation.inviteeId === id,
    } as GetSingleUser;

    if (!!areFriends) {
      response.friendsSince = areFriends.created;
    }

    return { user: response };
  }

  async updateSelf(user: UserDto, body: UpdateSelfDto) {
    const [_, returnedUsers] = await this.userModel.update(
      { ...body },
      { where: { userId: user.userId } },
    );

    return { user: new UserDto({ ...returnedUsers[0] }) };
  }
}
