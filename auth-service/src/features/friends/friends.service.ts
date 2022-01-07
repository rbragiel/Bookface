import { TranslationsKeys } from './../../contants/i18n';
import { FriendPair } from './friends.model';
import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Op, QueryTypes } from 'sequelize';
import { User } from '../user/user.model';
import { SuccessResponse } from '../../types/common';
import { Friend, GetFriendsResponse } from './types';

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(FriendPair) private readonly friends: typeof FriendPair,
    @InjectModel(User) private readonly user: typeof User,
  ) {}

  private createFriendsQuery = (userId: string) => {
    return `
    SELECT userId, nickname, email, joined, avatarURL, joined, FriendPairs.created as friendsSince 
      FROM Users 
    INNER JOIN FriendPairs
      ON Users.userId = FriendPairs.userOneId OR Users.userId = FriendPairs.userTwoId
    WHERE 
      Users.userId != '${userId}' AND (FriendPairs.userOneId = '${userId}' OR FriendPairs.userTwoId = '${userId}')`;
  };

  async findFriendsPair(userId: string, friendId: string) {
    const friendPair = await this.friends.findOne({
      where: {
        [Op.or]: [
          {
            userOneId: userId,
            userTwoId: friendId,
          },
          {
            userOneId: friendId,
            userTwoId: userId,
          },
        ],
      },
    });
    return friendPair;
  }

  async getFriends(userId: string): Promise<GetFriendsResponse> {
    const friends = await this.user.sequelize.query<Friend>(
      this.createFriendsQuery(userId),
      {
        type: QueryTypes.SELECT,
      },
    );

    return { friends };
  }

  async createFriends(userId: string, friendId: string) {
    const friendPair = await this.findFriendsPair(userId, friendId);

    if (friendPair) {
      throw new BadRequestException({
        message: TranslationsKeys.friendsAlreadyExisting,
      });
    }

    await this.friends.create({
      userOneId: userId,
      userTwoId: friendId,
    });

    return { success: true };
  }

  async removeFriends(
    userId: string,
    friendId: string,
  ): Promise<SuccessResponse> {
    const friendPair = await this.findFriendsPair(userId, friendId);

    if (!friendPair) {
      throw new BadRequestException({
        message: TranslationsKeys.friendsNotExisting,
      });
    }

    await friendPair.destroy();

    return { success: true };
  }
}
