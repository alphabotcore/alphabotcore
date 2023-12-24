const { SlashCommandBuilder, ChatInputCommandInteraction, Client, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("guildinfo")
        .setDescription("Get info about the server."),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const sortedRoles = interaction.guild.roles.cache.map(role => role).slice(1, interaction.guild.roles.cache.size).sort((a, b) => b.position - a.position);
        const userRoles = sortedRoles.filter(role => !role.managed);

        const ChannelTypeFilter = type => interaction.guild.channels.cache.filter(channel => type.includes(channel.type)).size;

        const TotalChannelsCount = ChannelTypeFilter([ ChannelType.GuildText, ChannelType.GuildAnnouncement, ChannelType.GuildVoice, ChannelType.GuildStageVoice, ChannelType.GuildForum ]);
        const CategoriesCount = ChannelTypeFilter([ ChannelType.GuildCategory ]);

        const DisplayRoles = (roles, maxFieldLength = 1024) => {
            let totalLength = 0;
            const result = [];

            for(const role of roles) {
                const roleString = `<@&${role.id}>`;

                if(roleString.length + totalLength > maxFieldLength)
                break;

                totalLength += roleString.length + 1
                result.push(roleString);
            }

            return result.length;
        }

        const GuildEmbed = new EmbedBuilder()
        .setAuthor({ name: `Guild Information`, iconURL: `${interaction.guild.iconURL()}` })
        .setTitle(`About @${interaction.guild.name}`)
        .setColor(0x2B2D31)
        .setThumbnail(interaction.guild.iconURL({ size: 2048 }))
        .addFields(
            {
                name: "`🌎` Name",
                value: `${interaction.guild.name}`,
                inline: true
            },
            {
                name: "`🛒` ID",
                value: `${interaction.guild.id}`,
                inline: true
            },
            {
                name: "`🧶` Server Created In",
                value: `<t:${parseInt(interaction.guild.createdTimestamp / 1000)}:F> (<t:${parseInt(interaction.guild.createdTimestamp / 1000)}:R>)`,
                inline: false
            },
            {
                name: "`🏆` Server Owner",
                value: `<@${interaction.guild.ownerId}>`,
                inline: false
            },
            {
                name: "`🔈` Discord Member Count",
                value: `${interaction.guild.memberCount}`,
                inline: false
            },
            {
                name: "`🎤` Categories",
                value: `${CategoriesCount}/50`,
                inline: true
            },
            {
                name: "`💼` Text Channels",
                value: `${ChannelTypeFilter([ ChannelType.GuildText, ChannelType.GuildAnnouncement, ChannelType.GuildForum ])}`,
                inline: true
            },
            {
                name: "`🔊` Voice Channels",
                value: `${ChannelTypeFilter([ ChannelType.GuildVoice, ChannelType.GuildStageVoice ])}`,
                inline: true
            },
            {
                name: "`⏰` Total Channels",
                value: `${TotalChannelsCount}/500`,
                inline: true
            },
            {
                name: "`👤` Roles",
                value: `${DisplayRoles(userRoles)}/250`,
                inline: true
            },
            {
                name: "`🐸` Emojis",
                value: `${interaction.guild.emojis.cache.size + interaction.guild.stickers.cache.size}/500`,
                inline: true
            },
        )
        .setTimestamp()
        .setFooter({ iconURL: interaction.user.displayAvatarURL(), text: `Requested by @${interaction.user.username}` })

        interaction.reply({ embeds: [GuildEmbed] })
    }
}