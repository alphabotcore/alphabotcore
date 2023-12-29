const { SlashCommandBuilder, ChatInputCommandInteraction, Client, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const core = require('alphabotcore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("untimeout")
        .setDescription("Untimeout a specific user from the server.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option => option.setName('target').setDescription('The user you want to untimeout.').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason of the untiming out the user.').setRequired(false)),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const timeUser = interaction.options.getUser('target');
        const timeMember = await interaction.guild.members.fetch(timeUser.id);
        const reason = interaction.options.getString('reason') || "No reason provided.";

        if(!timeMember) return await interaction.reply({ content: `${core.icons.crossmark} The user mentioned is no longer within the server.`, ephemeral: true });
        if(!timeMember.kickable) return await interaction.reply({ content: `${core.icons.crossmark} I cannot moderate this user as he has a higher role than me.`, ephemeral: true });
        if(interaction.member.id === timeMember.id) return await interaction.reply({ content: `${core.icons.crossmark} You cannot untimeout yourself!`, ephemeral: true });
        if(timeMember.permissions.has(PermissionFlagsBits.Administrator)) return await interaction.reply({ content: `${core.icons.crossmark} You cannot untimeout a user with the administrator permission.`, ephemeral: true });

        timeMember.timeout(null, reason);

        const InteractionEmbed = new EmbedBuilder()
        .setColor(core.colors.green)
        .setDescription(`${core.icons.checkmark} <@${timeMember.id}> was untimeout with the reason of: ${reason}.`)

        await interaction.reply({ embeds: [InteractionEmbed], ephemeral: true })
    }
}