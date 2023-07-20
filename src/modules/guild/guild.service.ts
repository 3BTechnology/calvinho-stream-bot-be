import { Injectable } from '@nestjs/common';
import { GuildRepository } from './guild.repository';
import { CreateGuildDto } from './dto/create-guild.dto';

@Injectable()
export class GuildService {
  constructor(private readonly guildRepository: GuildRepository) {}

  async create(createGuildDto: CreateGuildDto) {
    return await this.guildRepository.create(createGuildDto);
  }
}
