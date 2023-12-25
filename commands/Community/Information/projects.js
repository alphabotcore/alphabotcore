const { SlashCommandBuilder, ChatInputCommandInteraction, Client, EmbedBuilder } = require('discord.js');
const core = require('alphabotcore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("projects")
        .setDescription("Displays AlphaBotCore project list."),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const ProjectEmbed = new EmbedBuilder()
        .setColor(core.colors.embed)
        .setDescription(`
            **Upcoming Projects:**
            API
            Version: 1.0.2

            **Latest Project:**
            GitHub Project
        `)
        .setFooter({ iconURL: client.user.displayAvatarURL(), text: client.user.username })
        
        interaction.reply({ embeds: [ProjectEmbed] });
    }
}