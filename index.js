const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { eventListener } = require('./handlers/eventHandler.js');
const { commandListener } = require('./handlers/commandHandler.js');
const { buttonsListener } = require('./handlers/buttonHandler.js');
const config = require('./config/config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.User
    ]
});

client.commands = new Collection();
client.buttons = new Collection();
client.commandArray = [];

client.login(config.bot.token).then(() => {
    eventListener(client);
    commandListener(client);
    buttonsListener(client);
});