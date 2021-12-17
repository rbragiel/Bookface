import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Invitation } from './invitation.model';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [SequelizeModule.forFeature([Invitation]), AuthModule, UserModule],
  controllers: [InvitationController],
  providers: [InvitationService],
})
export class InvitationModule {}
