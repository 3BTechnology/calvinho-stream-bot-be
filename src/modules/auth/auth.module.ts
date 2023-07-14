import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserRepository } from '../user/user.repository';
import { DiscordStrategy } from './strategies/discord.strategy';
import { secret } from 'src/common/config/vars';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: secret,
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
