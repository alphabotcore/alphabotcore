const { SlashCommandBuilder, ChatInputCommandInteraction, Client, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const abc = require('alphabotcore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("timeout")
        .setDescription("Timeout a specific user from the server.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option => option.setName('target').setDescription('The user you want to time out.').setRequired(true))
        .addStringOption(option => option
            .setName('duration')
            .setDescription('The duration of the timeout.')
            .setRequired(true)
            .addChoices(
                { name: '60 Seconds', value: '60' },
                { name: '2 Minutes', value: '120' },
                { name: '5 Minutes', value: '300' },
                { name: '10 Minutes', value: '600' },
                { name: '15 Minutes', value: '900' },
                { name: '20 Minutes', value: '1200' },
                { name: '30 Minutes', value: '1800' },
                { name: '45 Minutes', value: '2700' },
                { name: '1 Hour', value: '3600' },
                { name: '2 Hours', value: '7200' },
                { name: '3 Hours', value: '10800' },
                { name: '5 Hours', value: '18000' },
                { name: '10 Hours', value: '36000' },
                { name: '1 Day', value: '86400' },
                { name: '2 Day', value: '172800' },
                { name: '3 Day', value: '259200' },
                { name: '5 Days', value: '432000' },
                { name: 'One Week', value: '604800' },
            )
        )
        .addStringOption(option => option.setName('reason').setDescription('The reason of the timing out the user.').setRequired(false)),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const timeUser = interaction.options.getUser('target');
        const timeMember = await interaction.guild.members.fetch(timeUser.id);
        const duration = interaction.options.getString('duration');
        const reason = interaction.options.getString('reason') || "No reason provided.";

        if(!timeMember) return await interaction.reply({ content: `${abc.icons.crossmark} The user mentioned is no longer within the server.`, ephemeral: true });
        if(!timeMember.kickable) return await interaction.reply({ content: `${abc.icons.crossmark} I cannot moderate this user as he has a higher role than me.`, ephemeral: true });
        if(interaction.member.id === timeMember.id) return await interaction.reply({ content: `${abc.icons.crossmark} You cannot timeout yourself!`, ephemeral: true });
        if(timeMember.permissions.has(PermissionFlagsBits.Administrator)) return await interaction.reply({ content: `${abc.icons.crossmark} You cannot timeout a user with the administrator permission.`, ephemeral: true });

        const durationMs = duration * 1000;

        const timeoutExpiresAt = Math.floor((Date.now() + durationMs) / 1000);

        timeMember.timeout(durationMs, reason);

        const UserDMEmbedMessage = new EmbedBuilder()
        .setAuthor({ iconURL: interaction.user.displayAvatarURL(), name: `${interaction.user.username} (${interaction.user.id})` })
        .setColor(abc.colors.embed)
        .setDescription(`
            You have been timeout from **${interaction.guild.name}**
        
            **Reason:**
            > ${reason}

            **Time:**
            > <t:${timeoutExpiresAt}:R>
        
            You were timeout by @${interaction.user.username}.`)
        .setTimestamp()

        const InteractionEmbed = new EmbedBuilder()
        .setColor(abc.colors.green)
        .setDescription(`${abc.icons.checkmark} <@${timeMember.id}> was timeout with the reason of: ${reason}. The timeout will be cancelled in <t:${timeoutExpiresAt}:R>`)

        await timeMember.send({ embeds: [UserDMEmbedMessage] }).catch(err => { return; });

        await interaction.reply({ embeds: [InteractionEmbed], ephemeral: true })
    }
}