import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  discordId: string;
  @IsString()
  username: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  avatar: string;
}
