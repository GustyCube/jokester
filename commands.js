import { InstallGlobalCommands } from './utils.js';

const CHUCKNORRIS_COMMAND = {
  name: 'chucknorris',
  type: 1, 
  description: 'Say a random Chuck Norris joke',
  integration_types: [0, 1], 
  contexts: [0, 1, 2], 
};

const DADJOKE_COMMAND = {
    name: 'dadjoke',
    type: 1, 
    description: 'Say a random dad joke',
    integration_types: [0, 1], 
    contexts: [0, 1, 2], 
  };

const ALL_COMMANDS = [CHUCKNORRIS_COMMAND, DADJOKE_COMMAND];

InstallGlobalCommands(process.env.CLIENT_ID, ALL_COMMANDS);
