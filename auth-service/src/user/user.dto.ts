import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserRegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(4, 25)
  nickname: string;

  @IsNotEmpty()
  @Length(6, 40)
  password: string;
}

export class UserLoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
