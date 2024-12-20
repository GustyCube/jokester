import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

let appId = process.env.APP_ID;
export async function InstallGlobalCommands(appId, commands) {
    const endpoint = `applications/${appId}/commands`;
  
    try {
      await DiscordRequest(endpoint, { method: 'PUT', body: commands });
    } catch (err) {
      console.error(err);
    }
  }
  export async function DiscordRequest(endpoint, options) {
    const url = 'https://discord.com/api/v10/' + endpoint;
    if (options.body) options.body = JSON.stringify(options.body);
    const res = await fetch(url, {
      headers: {
        Authorization: `Bot ${process.env.TOKEN}`,
        'Content-Type': 'application/json; charset=UTF-8',
        'User-Agent':
          'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
      },
      ...options,
    });
    if (!res.ok) {
      const data = await res.json();
      console.log(res.status);
      throw new Error(JSON.stringify(data));
    }
    return res;
  }