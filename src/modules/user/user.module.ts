import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { GuildService } from '../guild/guild.service';
import { GuildRepository } from '../guild/guild.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    UserRepository,
    JwtService,
    GuildService,
    GuildRepository,
  ],
})
export class UserModule {}
