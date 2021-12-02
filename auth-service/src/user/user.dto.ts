import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  @Length(6, 40)
  password: string;
}
