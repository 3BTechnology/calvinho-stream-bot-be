/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('discord')
  @UseGuards(AuthGuard('discord'))
  handleDiscordAuth(@Req() req) {}

  @Get('discord/callback')
  @UseGuards(AuthGuard('discord'))
  handleDiscordAuthCallback(@Req() req, @Res() res) {
    if (!req.user) {
      return 'No user found';
    }
    const { token, expires } = req.user;
    const expireDate = new Date(expires).toUTCString();
    req.res.setHeader('Set-Cookie', [
      `token=${token}; HttpOnly; Path=/; SameSite=None; Secure; Expires=${expireDate}}`,
    ]);

    res.redirect(`${process.env.CLIENT_URL}`);
  }
}
