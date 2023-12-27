const { SlashCommandBuilder, ChatInputCommandInteraction, Client, EmbedBuilder } = require('discord.js');
const abc = require('alphabotcore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("roleinfo")
        .setDescription("Receive information from a specific role.")
        .addRoleOption(option => option.setName('role').setDescription('Select a role.').setRequired(true)),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const role = interaction.options.getRole('role');

        const ChannelEmbed = new EmbedBuilder()
        .setAuthor({ name: `Role Information`, iconURL: client.user.displayAvatarURL() })
        .setTitle(`About ${role.name} role.`)
        .setColor(abc.colors.embed)
        .addFields(
            { name: '`📰` Name', value: `${role.name}`, inline: true },
            { name: '`🛒` ID', value: `${role.id}`, inline: true },
            { name: '`🌟` Created In', value: `<t:${parseInt(role.createdTimestamp / 1000)}> (<t:${parseInt(role.createdTimestamp / 1000)}:R>)` },
            { name: '`💠` Color', value: `${role.hexColor}`, inline: true },
            { name: '`🌵` Position', value: `${role.position}`, inline: true },
        )

        interaction.reply({ embeds: [ChannelEmbed] })
    }
}