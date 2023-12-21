const { SlashCommandBuilder, ChatInputCommandInteraction, Client, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("guildinfo")
        .setDescription("Get info about the server."),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const GuildEmbed = new EmbedBuilder()
        .setAuthor({ name: `${interaction.guild.name} (${interaction.guild.id})`, iconURL: interaction.guild.iconURL() })
        .setColor(0x2B2D31)
        .setDescription(`
            **Server Name:** \`${interaction.guild.name}\` (${interaction.guild.id})
            **Server Created In:** <t:${parseInt(interaction.guild.createdTimestamp / 1000)}:F> (<t:${parseInt(interaction.guild.createdTimestamp / 1000)}:R>)
            **Member Count:** ${interaction.guild.memberCount}
        `)

        interaction.reply({ embeds: [GuildEmbed] })
    }
}