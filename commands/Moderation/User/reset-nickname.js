const { SlashCommandBuilder, ChatInputCommandInteraction, Client, PermissionFlagsBits } = require('discord.js');
const abc = require('alphabotcore');
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reset-nickname")
        .setDescription("Reset a nickname of a specific user.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)
        .addUserOption(option => option.setName('target').setDescription('The user you are going to reset the nickname.').setRequired(true)),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const user = interaction.options.getUser('target');
        const member = await interaction.guild.members.fetch(user.id);

        const NicknameEmbed = new EmbedBuilder()
        .setColor(abc.colors.green)
        .setDescription(`${abc.icons.checkmark} The nickname of the user \`@${user.username}\` has been reset successfully.`)

        member.setNickname(null).catch(err => console.log(err));

        interaction.reply({ embeds: [NicknameEmbed], ephemeral: true })
    }
}