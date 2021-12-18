import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FriendPair } from './friends.model';
import { Op } from 'sequelize';
import { User } from '../user/user.model';

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(FriendPair) private readonly friends: typeof FriendPair,
  ) {}

  private excludeAttr = [
    'password',
    'updatedAt',
    'role',
    'description',
    'isActivated',
    'birthday',
  ];

  async getFriends(userId: string) {
    const friends = await this.friends.findAll({
      where: {
        [Op.or]: [
          {
            userOneId: userId,
          },
          {
            userTwoId: userId,
          },
        ],
      },
      include: [{ model: User, attributes: { exclude: this.excludeAttr } }],
    });

    return friends;
  }

  async createFriends(userId: string, friendId: string) {
    await this.friends.create({
      userOneId: userId,
      userTwoId: friendId,
    });
  }
  async removeFriend(userId: string, friendId: string) {
    await this.friends.destroy({
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
  }
}
