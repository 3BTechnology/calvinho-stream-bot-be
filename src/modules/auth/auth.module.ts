import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserRepository } from '../user/user.repository';
import { DiscordStrategy } from './strategies/discord.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.SECRET || '12345',
          signOptions: {
            noTimestamp: false,
          },
        };
      },
    }),
  ],
  controllers: [AbortController],
  providers: [AuthService, UserRepository, DiscordStrategy],
})
export class AuthModule {}
