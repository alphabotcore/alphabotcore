const { SlashCommandBuilder, ChatInputCommandInteraction, Client } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("open-source")
        .setDescription("Find the github link to the AlphaBotCore open source code."),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        interaction.reply({ content: `This is the link to the official AlphaBotCore repository, remember to leave a star if you like the project: https://github.com/alphabotcore/alphabotcore` })
    }
}