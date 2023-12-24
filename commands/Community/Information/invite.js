const { SlashCommandBuilder, ChatInputCommandInteraction, Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const color = require('../../../tools/Colors.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("invite")
        .setDescription("Invite the bot to your server!"),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const InviteEmbed = new EmbedBuilder()
        .setColor(color.embed)
        .setTitle("Invite AlphaBotCore to your server!")
        .setDescription(`
            AlphaBotCore is a **moderation bot**, it contains a basic moderation system with indispensable commands, and a more advanced system with other utilities. 
            It also contains a ticketing and reporting system, to build your Discord community. If you have any problem or suggestion, don't hesitate to let me know in the official AlphaBotCore github repository, you can see it here: https://github.com/alphabotcore/alphabotcore \`🌟\`.
        `)
        .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
        .setFooter({ iconURL: `https://github.com/woozyStudio.png`, text: "AlphaBotCore © 2023 by WoozyStudio." })

        const InviteButton = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel("Invite")
            .setStyle(ButtonStyle.Link)
            .setURL("https://discord.com/api/oauth2/authorize?client_id=1130359065546076200&permissions=8&scope=applications.commands%20bot")
        )

        interaction.reply({ embeds: [InviteEmbed], components: [InviteButton] });
    }
}