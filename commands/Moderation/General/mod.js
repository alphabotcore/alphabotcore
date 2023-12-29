const { ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ChatInputCommandInteraction, Client, PermissionFlagsBits } = require('discord.js');
const TicketSetup = require('../../../models/createTicketSetup.js');
const abc = require('alphabotcore');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("mod")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDescription("Configure everything about moderation.")
    .addSubcommandGroup(group => group
        .setName("setup")
        .setDescription("Configure any system or bot package.")
        .addSubcommand(subcommand => subcommand
            .setName("tickets")
            .setDescription("Configure the bot ticketing system for your server.")
            .addChannelOption(option => option.setName('channel').setDescription('Select the channel where the tickets should be created.').setRequired(true).addChannelTypes(ChannelType.GuildText))
            .addChannelOption(option => option.setName('category').setDescription('Select the category where the tickets should be created.').setRequired(true).addChannelTypes(ChannelType.GuildCategory))
            .addChannelOption(option => option.setName('transcripts').setDescription('Select the channel where the transcripts should be sent.').setRequired(true).addChannelTypes(ChannelType.GuildText))
            .addRoleOption(option => option.setName('everyone').setDescription('Tag the everyone role.').setRequired(true))
            .addStringOption(option => option.setName('description').setDescription('Write a description or a message for the ticket embed.').setRequired(false)),
        )
    ),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if (interaction.options.getSubcommand() === "tickets") {
            try {
                const channel = interaction.options.getChannel('channel');
                const category = interaction.options.getChannel('category');
                const transcripts = interaction.options.getChannel('transcripts');
    
                const everyone = interaction.options.getRole('everyone');
                const description = interaction.options.getString('description') || "\`❓\` **What are tickets?**\nTickets are a very simple way for users to contact the server administration team. If you need to create a ticket for any question or doubt, or you need to report a user for bad behavior on the server, this is the place for you.\n \n\`🎫\` **Ticket Types**\nOn the server there are 2 types of tickets, general tickets and report tickets. General tickets are for questions or doubts about the server or something else related. And the report tickets are for reporting users for bad behavior, for example, or server bugs.\n \n\`🔨\` **Important**\nAny misuse of tickets is punishable, so be careful not to create too many tickets unnecessarily, or else you will be penalized.";
    
                const data = await TicketSetup.findOneAndUpdate({ GuildID: interaction.guild.id }, {
                    Channel: channel.id,
                    Category: category.id,
                    Transcripts: transcripts.id,
                    Everyone: everyone.id,
                    Description: description
                },
                {
                    new: true,
                    upsert: true
                });
    
                const CreateTicketEmbed = new EmbedBuilder()
                .setDescription(description)
                .setColor(abc.colors.embed)
    
                const Buttons = new ActionRowBuilder().setComponents(
                    new ButtonBuilder()
                    .setCustomId("openticket")
                    .setLabel("Open Ticket")
                    .setEmoji("📩")
                    .setStyle(ButtonStyle.Secondary),
                )
    
                await interaction.guild.channels.cache.get(channel.id).send({ embeds: [CreateTicketEmbed], components: [Buttons] });
                interaction.reply({ content: `${abc.icons.checkmark} The tickets panel has been successfully created.`, ephemeral: true })
    
                } catch (err) {
                    console.log(err)
                return interaction.reply({ content: `${abc.icons.crossmark} An error has occurred, try again later...`, ephemeral: true });
            }
        }
    }
}