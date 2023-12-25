const { SlashCommandBuilder, ChatInputCommandInteraction, Client, EmbedBuilder } = require('discord.js');
const core = require('alphabotcore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Shows the user avatar.")
        .addUserOption(option => option.setName('target').setDescription('Select a user.').setRequired(true)),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const user = interaction.options.getUser('target');

        const AvatarEmbed = new EmbedBuilder()
        .setTitle(`@${user.username}'s avatar.`)
        .setFooter({ text: `Requested by @${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
        .setImage(`${user.displayAvatarURL({ size: 2048 })}`)
        .setColor(core.colors.embed)

        interaction.reply({ embeds: [AvatarEmbed] });
    }
}