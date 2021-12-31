/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserLoginDto, UserRegisterDto } from '../user/user.dto';
import { TranslationsKeys } from '../../contants/i18n';
import { compare, hash } from 'bcrypt';
import { User, UserWithToken } from '../user/user.model';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { URL } from 'url';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  private readonly salt: number = 10;
  private readonly expireTime: string = '24h';

  private async sendEmail(email: string): Promise<void> {
    const activationToken = await this.jwtService.signAsync(
      { email },
      { expiresIn: this.expireTime },
    );

    const clientLink = `${this.configService.get<string>('CLIENT_URL')}`;
    const url = new URL(`${clientLink}/activate`);
    url.searchParams.append('token', activationToken);

    const anchor = `<a href="${url.toString()}">Confirm</a>`;

    await this.mailerService.sendMail({
      to: email,
      subject: `Email confirmation for ${email}`,
      html: `
            <h1>Confirm your email to start using our services!</h1>
            <p>Here you have a link:</p>
            ${anchor}
      `,
    });
  }

  private async issueToken(user: User) {
    const plainUser = user.get({ plain: true });
    const token = this.jwtService.sign(
      { ...plainUser },
      { expiresIn: this.expireTime },
    );

    return new UserWithToken({ ...plainUser, token });
  }

  async validate({ email, password }: UserLoginDto): Promise<UserWithToken> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException({
        message: TranslationsKeys.userNotFoundOrPasswordNotMatching,
      });
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException({
        message: TranslationsKeys.userNotFoundOrPasswordNotMatching,
      });
    }

    if (
      !user.isActivated &&
      this.configService.get('NODE_ENV') === 'production'
    ) {
      throw new ForbiddenException({
        message: TranslationsKeys.accountNotActivated,
      });
    }

    return this.issueToken(user);
  }

  async register({ email, password, nickname }: UserRegisterDto) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      throw new BadRequestException({
        message: TranslationsKeys.userAlreadyExists,
      });
    }

    const hashedPassword = await hash(password, this.salt);

    await this.userService.create({
      email,
      nickname,
      password: hashedPassword,
    });

    this.logger.log(`User has been saved`);

    await this.sendEmail(email);

    this.logger.log(`Email to ${email} was sent.`);

    return { success: true };
  }

  async activate(token: string) {
    let email: string | null;
    try {
      const {
        iat: _,
        exp: __,
        email: _email,
      } = await this.jwtService.verifyAsync<{
        iat: number;
        exp: number;
        email: string;
      }>(token);

      email = _email;
    } catch (error) {
      throw new UnauthorizedException({
        message: TranslationsKeys.cannotActivateAccount,
      });
    }

    let user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException({
        message: TranslationsKeys.cannotActivateAccount,
      });
    }

    if (user.isActivated) {
      throw new BadRequestException({
        message: TranslationsKeys.accountAlreadyActivated,
      });
    }

    user.isActivated = true;
    user = await user.save();

    return this.issueToken(user);
  }
}
