import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserRegisterDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 4, maxLength: 25 })
  @IsNotEmpty()
  @Length(4, 25)
  nickname: string;

  @ApiProperty({
    minLength: 6,
    maxLength: 40,
  })
  @IsNotEmpty()
  @Length(6, 40)
  password: string;
}

export class UserLoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
