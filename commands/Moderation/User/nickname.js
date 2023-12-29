const { SlashCommandBuilder, ChatInputCommandInteraction, Client, PermissionFlagsBits } = require('discord.js');
const abc = require('alphabotcore');
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("nickname")
        .setDescription("Modifies a nickname of a specific user.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)
        .addUserOption(option => option.setName('target').setDescription('The user you are going to change the nickname.').setRequired(true))
        .addStringOption(option => option.setName('nickname').setDescription('Write the new user nickname.').setRequired(true)),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const user = interaction.options.getUser('target');
        const member = await interaction.guild.members.fetch(user.id);
        const nickname = interaction.options.getString('nickname');

        if(!member.kickable) return await interaction.reply({ content: `${abc.icons.crossmark} I cannot moderate this user as he has a higher role than me.`, ephemeral: true });

        const NicknameEmbed = new EmbedBuilder()
        .setColor(abc.colors.green)
        .setDescription(`${abc.icons.checkmark} The nickname of the user \`@${user.username}\` has been changed to the nickname \`${nickname}\`.`)

        member.setNickname(`${nickname}`).catch(err => console.log(err));

        interaction.reply({ embeds: [NicknameEmbed], ephemeral: true })
    }
}