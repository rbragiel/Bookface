import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions, Op } from 'sequelize';
import {
  UserRegisterDto,
  UserSearchDto,
  UsersSearchResultDto,
} from './user.dto';
import { User, UserRole } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

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
    const likeQuery = `${query}%`;
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
}
