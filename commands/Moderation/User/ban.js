const { SlashCommandBuilder, ChatInputCommandInteraction, Client, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const core = require('alphabotcore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Bans a user permanently from the server.")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option => option.setName('user').setDescription('The member you want to ban.').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for banning the member.').setRequired(false)),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || "No reason provided.";
        const banUser = client.users.cache.get(user.id);

        if(interaction.member.id === user.id) return await interaction.reply({ content: `${core.icons.crossmark} You cannot ban yourself!`, ephemeral: true });
        
        const UserDMEmbedMessage = new EmbedBuilder()
        .setAuthor({ iconURL: interaction.user.displayAvatarURL(), name: `${interaction.user.username} (${interaction.user.id})` })
        .setColor(core.colors.embed)
        .setDescription(`
            You have been banned from **${interaction.guild.name}**
        
            **Reason:**
            > ${reason}
        
            You were banned by @${interaction.user.username}.`)
        .setTimestamp()

        const InteractionEmbed = new EmbedBuilder()
        .setColor(core.colors.green)
        .setDescription(`${core.icons.checkmark} <@${banUser.id}> was banned with the reason of: ${reason}.`)

        await interaction.guild.bans.create(banUser.id, {reason}).catch(err => {
            return interaction.reply({ conent: `${core.icons.crossmark} I do not have sufficient permissions to do this action.`, ephemeral: true })
        });

        await banUser.send({ embeds: [UserDMEmbedMessage] }).catch(err => { return; });

        await interaction.reply({ embeds: [InteractionEmbed] });

    }
}