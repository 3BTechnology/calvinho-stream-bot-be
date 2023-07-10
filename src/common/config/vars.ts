import { config } from 'dotenv';

config();

export const secret = <string>process.env.SECRET;
export const tokenUrl = <string>process.env.TWITCH_TOKEN_URL;
export const twitchClientSecret = <string>process.env.TWITCH_CLIENT_SECRET;
export const searchStreamUrl = <string>process.env.TWITCH_SEARCH_STREAM_URL;
export const twitchClientId = <string>process.env.TWITCH_CLIENT_ID;
export const discordClientId = <string>process.env.DISCORD_CLIENT_ID;
export const discordSecret = <string>process.env.DISCORD_CLIENT_SECRET;
export const port = process.env.PORT;
