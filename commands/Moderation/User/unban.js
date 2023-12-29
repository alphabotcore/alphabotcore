const { SlashCommandBuilder, ChatInputCommandInteraction, Client, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const abc = require('alphabotcore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Unbans a user from the server.")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option => option.setName('id').setDescription('The member id you want to unban.').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for unbanning the member.').setRequired(false)),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const id = interaction.options.getString('id');
        const reason = interaction.options.getString('reason') || "No reason provided.";

        const UnbanEmbed = new EmbedBuilder()
        .setColor(abc.colors.green)
        .setDescription(`${abc.icons.checkmark} <@${id}> was unbanned with the reason of: ${reason}.`)

        await interaction.guild.bans.fetch().then(async bans => {
            if(bans.size = 0) return await interaction.reply({ content: `${abc.icons.crossmark} There is no one banned from this guild.`, ephemeral: true });
            let bannedId = bans.find(ban => ban.user.id == id);
            if(!bannedId) return await interaction.reply({ content: `${abc.icons.crossmark} The ID given is not banned from this guild.`, ephemeral: true });

            await interaction.guild.bans.remove(id, reason).catch(err => {
                return interaction.reply({ content: `${abc.icons.crossmark} I don't have permissions to do this action.` });
            });
        });

        await interaction.reply({ embeds: [UnbanEmbed] });

    }
}