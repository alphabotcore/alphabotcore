const { SlashCommandBuilder, ChatInputCommandInteraction, Client, PermissionFlagsBits } = require('discord.js');
const ModerationPerms = require('../../../permissions/ModerationRecomendedPermissions.js');
const abc = require('alphabotcore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("addmod")
        .setDescription("Add moderator permissions to a role.")
        .addRoleOption(option => option.setName('role').setDescription('Select the role you want to grant permissions.').setRequired(true)),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const role = await interaction.options.getRole('role');

        role.setPermissions([ ModerationPerms ]);
        interaction.reply({ content: `${abc.icons.checkmark} Added moderator permissions to the role ${role}`, ephemeral: true })
    }
}