import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import { I18nModule, I18nJsonParser, HeaderResolver } from 'nestjs-i18n';
import { Languages } from './contants/i18n';
import { APP_FILTER } from '@nestjs/core';
import { I18nExceptionFilter } from './filters/exception.filter';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './features/user/user.model';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './features/auth/auth.module';
import { FriendPair } from './features/friends/friends.model';
import { MailerModule } from '@nestjs-modules/mailer';
import { Invitation } from './features/invitation/invitation.model';
import { InvitationModule } from './features/invitation/invitation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    I18nModule.forRoot({
      fallbackLanguage: Languages.EN,
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '/i18n'),
      },
      resolvers: [new HeaderResolver(['app-lang'])],
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.AUTH_HOST,
      port: +process.env.AUTH_PORT,
      username: process.env.AUTH_USER,
      password: process.env.AUTH_PASSWORD,
      database: process.env.AUTH_DATABASE,
      models: [Invitation, User, FriendPair],
      autoLoadModels: true,
      synchronize: true,
    }),
    MailerModule.forRootAsync({
      useFactory: (configService) => {
        return {
          transport: {
            service: 'gmail',
            auth: {
              user: configService.get('EMAIL'),
              pass: configService.get('EMAIL_PASSWORD'),
            },
          },
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    InvitationModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: I18nExceptionFilter,
    },
  ],
})
export class AppModule {}
