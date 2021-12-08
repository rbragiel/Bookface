import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserLoginDto, UserRegisterDto } from '../user/user.dto';
import { TranslationsKeys } from '../contants/i18n';
import { compare, hash } from 'bcrypt';
import { UserModel, UserWithToken } from '../user/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly salt: number = 10;
  private readonly expireTime: string = '24h';

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

    const plainUser = user.get({ plain: true });
    const token = this.jwtService.sign(
      { ...plainUser },
      { expiresIn: this.expireTime },
    );

    return new UserWithToken({ ...plainUser, token });
  }

  async register({
    email,
    password,
    nickname,
  }: UserRegisterDto): Promise<UserModel> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      throw new BadRequestException({
        message: TranslationsKeys.userAlreadyExists,
      });
    }

    const hashedPassword = await hash(password, this.salt);

    const newUser = await this.userService.create({
      email,
      nickname,
      password: hashedPassword,
    });

    const plainUser = newUser.get({ plain: true });

    return new UserModel({ ...plainUser });
  }
}
