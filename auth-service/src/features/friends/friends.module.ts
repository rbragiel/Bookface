import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './../auth/auth.module';
import { FriendsController } from './friends.controller';
import { FriendPair } from './friends.model';
import { FriendsService } from './friends.service';
import { UserModule } from '../user/user.module';
@Module({
  imports: [
    SequelizeModule.forFeature([FriendPair]),
    AuthModule,
    forwardRef(() => UserModule),
  ],
  controllers: [FriendsController],
  providers: [FriendsService],
  exports: [SequelizeModule.forFeature([FriendPair]), FriendsService],
})
export class FriendsModule {}
