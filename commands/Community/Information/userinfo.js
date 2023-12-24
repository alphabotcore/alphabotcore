const { SlashCommandBuilder, ChatInputCommandInteraction, Client, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Get info about a member.")
        .addUserOption(option => option.setName('target').setDescription('Select a user from the server.').setRequired(true)),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const user = interaction.options.getUser('target');
        const member = await interaction.guild.members.fetch(user.id);

        const UserEmbed = new EmbedBuilder()
        .setAuthor({ name: `User Information`, iconURL: client.user.displayAvatarURL() })
        .setTitle(`About @${user.username}`)
        .setColor(0x2B2D31)
        .addFields(
            { name: '`🌎` Username', value: `${user}`, inline: true },
            { name: '`🛒` ID', value: `${user.id}`, inline: true },
            { name: '`🌟` Discord Member Since', value: `<t:${parseInt(user.createdTimestamp / 1000)}> (<t:${parseInt(user.createdTimestamp / 1000)}:R>)` },
            { name: '`🧶` Server Member SInce', value: `<t:${parseInt(member.joinedAt / 1000)}> (<t:${parseInt(member.joinedAt / 1000)}:R>)` }
        )
        .setThumbnail(user.displayAvatarURL({ size: 2048 }))

        interaction.reply({ embeds: [UserEmbed] })
    }
}