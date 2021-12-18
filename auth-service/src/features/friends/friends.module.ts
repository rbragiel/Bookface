import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { FriendPair } from './friends.model';
import { FriendsService } from './friends.service';

@Module({
  imports: [SequelizeModule.forFeature([FriendPair])],
  providers: [FriendsService],
  exports: [SequelizeModule.forFeature([FriendPair]), FriendsService],
})
export class FriendsModule {}
