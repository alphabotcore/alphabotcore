const { SlashCommandBuilder, ChatInputCommandInteraction, Client } = require('discord.js');
const { ErrorEmbed } = require('../../embeds/ErrorEmbed.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("features")
        .setDescription("Command for testing new bot features.")
        .addStringOption(option => option
            .setName('feature')
            .setDescription('Select a feature')
            .setRequired(true)
            .addChoices(
                { name: 'embeds', value: 'embed_handler' },
            )
        ),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const feature = interaction.options.getString('feature');
        if(!feature) return;

        if(feature === "embed_handler") {
            interaction.reply({ content: "You are previewing: \"embed handler\".", embeds: [ErrorEmbed] })
        }
    }
}