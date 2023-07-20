import { IsString } from 'class-validator';

export class CreateGuildDto {
  @IsString()
  userId: string;
  @IsString()
  guildId: string;
  @IsString()
  name: string;
  @IsString()
  icon?: string;
}
