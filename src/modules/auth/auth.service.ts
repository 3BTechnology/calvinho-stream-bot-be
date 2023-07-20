import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';
import { Prisma, User } from '../prisma';
import Strategy, { Profile } from 'passport-discord';
import { secret } from 'src/common/config/vars';
import { GuildService } from '../guild/guild.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly guildService: GuildService,
  ) {}

  async findOrCreateUser(profile: Profile): Promise<{
    user: User;
    token: string;
  }> {
    const { id, username, email, avatar, guilds } = profile;

    const existingUser = await this.userRepository.findOneByEmail(email);

    if (existingUser) {
      return this.signIn(existingUser);
    }

    return this.signUp(
      {
        discordId: id,
        username,
        email,
        avatar,
      },
      guilds,
    );
  }

  private async signUp(
    user: {
      discordId: string;
      username: string;
      email: string;
      avatar: string;
    },
    guilds: Strategy.GuildInfo[],
  ) {
    const { discordId, username, email, avatar } = user;

    const input: Prisma.UserCreateInput = {
      discordId,
      username,
      email,
      avatar,
    };

    const newUser = await this.userRepository.create(input);

    guilds.map(async (guild) => {
      if (guild.owner === true) {
        await this.guildService.create({
          userId: newUser.id,
          guildId: guild.id,
          name: guild.name,
          icon: guild.icon,
        });
      }
    });

    const token = await this.generateToken(newUser.id, email);

    return { token, user: newUser, new: true };
  }

  private async signIn(user: User) {
    await this.linkOAuthAccountToUser(user);

    const token = await this.generateToken(user.id, user.email);

    return { user, token };
  }

  private async linkOAuthAccountToUser(user: User) {
    const updateInput: Prisma.UserUpdateInput = {};

    await this.userRepository.update(updateInput, { email: user.email });
  }

  private async generateToken(userId: string, email: string) {
    const user = await this.userRepository.findOneByEmail(email);
    return this.jwtService.sign(
      {
        id: userId,
        discordId: user.discordId,
        email,
      },
      { subject: userId, secret: secret },
    );
  }
}
