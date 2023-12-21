const { Events, Client, ChatInputCommandInteraction } = require('discord.js');
require('colors');

module.exports = {
    name: Events.ClientReady,
    once: true,
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
    */
    async execute(interaction, client) {
        console.log(`Logged as ${client.user.tag}.`.green)
    }
}