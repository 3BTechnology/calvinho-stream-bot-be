import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { CreateGuildDto } from './dto/create-guild.dto';

@Injectable()
export class GuildRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateGuildDto) {
    return await this.prismaService.guild.create({ data: data });
  }
}
