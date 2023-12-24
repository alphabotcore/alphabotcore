const { SlashCommandBuilder, ChatInputCommandInteraction, Client, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("channelinfo")
        .setDescription("Receive information from a specific channel.")
        .addChannelOption(option => option.setName('channel').setDescription('Select a channel.').setRequired(true)),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const channel = interaction.options.getChannel('channel');

        const ChannelEmbed = new EmbedBuilder()
        .setAuthor({ name: `Channel Information`, iconURL: client.user.displayAvatarURL() })
        .setTitle(`About ${channel.name} channel.`)
        .setColor(0x2B2D31)
        .addFields(
            { name: '`📰` Name', value: `${channel.name}`, inline: true },
            { name: '`🛒` ID', value: `${channel.id}`, inline: true },
            { name: '`🌟` Created In', value: `<t:${parseInt(channel.createdTimestamp / 1000)}> (<t:${parseInt(channel.createdTimestamp / 1000)}:R>)` },
        )

        interaction.reply({ embeds: [ChannelEmbed] })
    }
}