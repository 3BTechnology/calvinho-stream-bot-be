import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './modules/prisma';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './common/auth/auth.module';
import { AuthController } from './modules/auth/auth.controller';
import { DiscordStrategy } from './modules/auth/strategies/discord.strategy';
import { AuthService } from './modules/auth/auth.service';
import { UserRepository } from './modules/user/user.repository';
import { GuildService } from './modules/guild/guild.service';
import { GuildRepository } from './modules/guild/guild.repository';

@Module({
  imports: [UserModule, PrismaModule, AuthModule],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    JwtService,
    DiscordStrategy,
    AuthService,
    UserRepository,
    GuildService,
    GuildRepository,
  ],
})
export class AppModule {}
