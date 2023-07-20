import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';
import { AuthService } from '../auth.service';
import {
  discordCallbackUrl,
  discordClientId,
  discordSecret,
} from 'src/common/config/vars';
import { Profile } from 'passport-discord';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: discordClientId,
      clientSecret: discordSecret,
      callbackURL: discordCallbackUrl,
      scope: ['identify', 'email', 'guilds'],
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
