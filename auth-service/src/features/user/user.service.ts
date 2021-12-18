import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { UserRegisterDto } from './user.dto';
import { User, UserRole } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

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
}
