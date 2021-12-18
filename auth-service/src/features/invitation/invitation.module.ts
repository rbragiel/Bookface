import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Invitation } from './invitation.model';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { FriendsModule } from '../friends/friends.module';
import { FriendsService } from '../friends/friends.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Invitation]),
    AuthModule,
    UserModule,
    FriendsModule,
  ],
  controllers: [InvitationController],
  providers: [InvitationService, FriendsService],
})
export class InvitationModule {}
