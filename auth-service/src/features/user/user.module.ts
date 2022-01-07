import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { FriendsModule } from '../friends/friends.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), AuthModule, FriendsModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, SequelizeModule.forFeature([User])],
})
export class UserModule {}
