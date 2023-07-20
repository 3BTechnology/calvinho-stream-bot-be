import { Module } from '@nestjs/common';
import { GuildService } from './guild.service';
import { GuildRepository } from './guild.repository';

@Module({
  providers: [GuildService, GuildRepository],
})
export class GuildModule {}
