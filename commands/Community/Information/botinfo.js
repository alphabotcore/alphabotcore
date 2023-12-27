const { SlashCommandBuilder, ChatInputCommandInteraction, Client, EmbedBuilder } = require('discord.js');
const abc = require('alphabotcore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("botinfo")
        .setDescription("Receive information from AlphaBotCore."),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const BotEmbed = new EmbedBuilder()
        .setAuthor({ name: `Bot Information`, iconURL: client.user.displayAvatarURL() })
        .setTitle(`About ${client.user.username}`)
        .setColor(abc.colors.embed)
        .addFields(
            { name: '`📹` Name', value: `${client.user.tag}` },
            { name: '`🛒` ID', value: `${client.user.id}` },
            { name: '`🌟` Created In', value: `<t:${parseInt(client.user.createdTimestamp / 1000)}> (<t:${parseInt(client.user.createdTimestamp / 1000)}:R>)` },
            { name: '`🏆` Creator', value: `WoozyStudio <woozystudiocontact@gmail.com>` },
        )
        .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))

        interaction.reply({ embeds: [BotEmbed] })
    }
}