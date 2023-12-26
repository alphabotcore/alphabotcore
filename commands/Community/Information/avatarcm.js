const { ChatInputCommandInteraction, Client, ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder } = require('discord.js');
const core = require('alphabotcore');

module.exports = {
    data: new ContextMenuCommandBuilder()
	    .setName('Avatar')
	    .setType(ApplicationCommandType.User),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const user = interaction.targetUser;

        const AvatarEmbed = new EmbedBuilder()
        .setTitle(`@${user.username}'s avatar.`)
        .setFooter({ text: `Requested by @${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
        .setImage(`${user.displayAvatarURL({ size: 2048 })}`)
        .setColor(core.colors.embed)

        interaction.reply({ embeds: [AvatarEmbed] });
    }
} 