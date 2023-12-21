const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { eventListener } = require('./bot/handlers/eventHandler.js');
const { commandListener } = require('./bot/handlers/commandHandler.js');
require('dotenv').config();

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
client.commandArray = [];

client.login(process.env.token).then(() => {
    eventListener(client);
    commandListener(client);
});