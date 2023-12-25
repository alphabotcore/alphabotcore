const { SlashCommandBuilder, ChatInputCommandInteraction, Client } = require('discord.js');
const { version } = require('../../../package.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("version")
        .setDescription("Displays the current version of the bot."),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        interaction.reply({ content: `AlphaBotCore is currently in version \`v${version}\`` });
    }
}