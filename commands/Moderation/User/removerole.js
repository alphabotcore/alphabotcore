const { SlashCommandBuilder, ChatInputCommandInteraction, Client, PermissionFlagsBits } = require('discord.js');
const core = require('alphabotcore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("removerole")
        .setDescription("Remove a role to a specific user.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addUserOption(option => option.setName('target').setDescription('Select a user to remove the role.').setRequired(true))
        .addRoleOption(option => option.setName('role').setDescription('Select a role.').setRequired(true)),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const target = interaction.options.getUser('target');
        const role = interaction.options.getRole('role');
        const member = await interaction.guild.members.fetch(target.id);

        if (!member.roles.cache.has(role.id)) {
            await interaction.reply({ content: `${core.icons.crossmark} ${target} does not have this role`, ephemeral: true })
            return;
        } try {
            await interaction.guild.members.cache.get(target.id).roles.remove(role)
            await interaction.reply({ content: `${core.icons.checkmark} Successfully removed the role <@&${role.id}> to ${target}!`, ephemeral: true })
        } catch (err) {
            console.error(err)
            await interaction.reply({ content: `${core.icons.crossmark} Failed to remove the role <@&${role.id}> to ${target}`, ephemeral: true })
        }
    }
}