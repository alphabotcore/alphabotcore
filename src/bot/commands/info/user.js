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
        .setAuthor({ name: `${user.username} (${user.id})`, iconURL: user.displayAvatarURL() })
        .setColor(0x2B2D31)
        .setDescription(`
            **Username:** \`${user.username}\` (${user.id})
            **Discord Member Since:** <t:${parseInt(user.createdTimestamp / 1000)}> (<t:${parseInt(user.createdTimestamp / 1000)}:R>)
            **Server Member Since:** <t:${parseInt(member.joinedAt / 1000)}> (<t:${parseInt(member.joinedAt / 1000)}:R>)
        `)

        interaction.reply({ embeds: [UserEmbed] })
    }
}