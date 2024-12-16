import { Client, GatewayIntentBits } from 'discord.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'chucknorris') {
    try {
      const response = await axios.get('https://api.chucknorris.io/jokes/random');
      const joke = response.data;

      await interaction.reply({
        embeds: [
          {
            color: 0xFFA500,
            title: 'Chuck Norris Joke',
            description: joke.value,
            thumbnail: { url: joke.icon_url },
            footer: { text: 'Source: api.chucknorris.io' },
          },
        ],
      });
    } catch (error) {
      console.error(error);
      await interaction.reply('Sorry, I couldn\'t fetch a joke at this time.');
    }
  } else if (interaction.commandName === 'dadjoke') {
    try {
        const headers = new Headers();
headers.append('Accept', 'text/plain');
const response = await fetch('https://icanhazdadjoke.com/', {
    method: 'GET', 
    headers: headers
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const joke = await response.text(); 
  await interaction.reply({
    embeds: [
      {
        color: 0xFFA500,
        title: 'Dad Joke',
        description: joke,
        footer: { text: 'Source: icanhazdadjoke.com' },
      },
    ],
  });

      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          embeds: [
            {
              color: 0x00FF00,
              title: 'Dad Joke',
              description: joke,
              footer: { text: 'Source: icanhazdadjoke.com' },
            },
          ],
        },
      });
    } catch (error) {
      console.error('Error fetching Dad joke:', error);

      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: 'Oops! I couldn\'t fetch a dad joke at the moment.',
        },
      });
    }
  }

});

client.login(process.env.TOKEN);
