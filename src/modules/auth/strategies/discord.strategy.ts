import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';
import { AuthService } from '../auth.service';
import { discordClientId, discordSecret } from 'src/common/config/vars';
import { Profile } from 'passport-discord';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: discordClientId,
      clientSecret: discordSecret,
      callbackURL: 'http://localhost:3000/auth/discord/callback',
      scope: ['identify', 'email'],
    });
  }

  async validate(
    _: string,
    __: string,
    profile: Profile,
    done: (error: string, user?: Express.User) => void,
  ) {
    try {
      const result = await this.authService.findOrCreateUser(profile);
      done(null, result);
    } catch (error) {
      done(error.toString());
    }
  }
}
