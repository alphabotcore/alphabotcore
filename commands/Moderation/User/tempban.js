const { SlashCommandBuilder, ChatInputCommandInteraction, Client, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const abc = require('alphabotcore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("tempban")
        .setDescription("Bans a user temporarily from the server.")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option => option.setName('user').setDescription('The member you want to ban temporarily.').setRequired(true))
        .addIntegerOption(option => option.setName('time').setDescription('The time you want to ban the member. Only you can write seconds.').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for banning the member.').setRequired(false)),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const user = interaction.options.getUser('user');
        const duration = interaction.options.getInteger('time');
        const reason = interaction.options.getString('reason') || "No reason provided.";
        const banUser = client.users.cache.get(user.id);

        if(interaction.member.id === user.id) return await interaction.reply({ content: `${abc.icons.crossmark} You cannot ban yourself!`, ephemeral: true });

        const durationMs = duration * 1000;

        const banExpiresAt = Math.floor((Date.now() + durationMs) / 1000);

        const UserDMEmbedMessage = new EmbedBuilder()
        .setAuthor({ iconURL: interaction.user.displayAvatarURL(), name: `${interaction.user.username} (${interaction.user.id})` })
        .setColor(abc.colors.embed)
        .setDescription(`
            You have been temporarily banned from **${interaction.guild.name}**
        
            **Reason:**
            > ${reason}

            **Time:**
            > <t:${banExpiresAt}:R>
        
            You were banned by @${interaction.user.username}.`)
        .setTimestamp()

        const InteractionEmbed = new EmbedBuilder()
        .setColor(abc.colors.green)
        .setDescription(`${abc.icons.checkmark} <@${banUser.id}> was temporarily banned with the reason of: ${reason}. The ban will be cancelled in <t:${banExpiresAt}:R>`)

        await interaction.guild.members.ban(user.id, { reason }).catch(err => {
            return interaction.reply({ content: `${abc.icons.crossmark} I do not have sufficient permissions to do this action.`, ephemeral: true })
        });

        await banUser.send({ embeds: [UserDMEmbedMessage] }).catch(err => { return; });

        await interaction.reply({ embeds: [InteractionEmbed], ephemeral: true });

        setTimeout(async() => {
            await interaction.guild.members.unban(user.id);

        }, durationMs);

    }
}