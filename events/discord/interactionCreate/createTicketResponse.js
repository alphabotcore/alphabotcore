const { Client, Events, ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, EmbedBuilder, ChannelType, PermissionFlagsBits, ButtonStyle } = require('discord.js');
const abc = require('alphabotcore');
const ticketSchema = require('../../../models/createTickets.js');
const ticketSetup = require('../../../models/createTicketSetup.js');

module.exports = {
    name: Events.InteractionCreate,
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
    */
    async execute(interaction, client) {
        const ticketId = Math.floor(Math.random() * 9000) + 10000;

        if(!interaction.isButton()) return;
        
        const data = await ticketSetup.findOne({ GuildID: interaction.guild.id });

        if(!data) return;
        if(!["openticket"].includes(interaction.customId)) return;
        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageChannels)) return interaction.reply({ content: `${abc.icons.crossmark} Missing Permissions for the bot: \`ManageChannels\``, ephemeral: true });

        try {
            await interaction.guild.channels.create({
                name: `${interaction.member.user.username}-ticket${ticketId}`,
                type: ChannelType.GuildText,
                parent: data.Category,
                permissionOverwrites: [
                    {
                        id: data.Everyone,
                        deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
                    },
                    {
                        id: interaction.member.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
                    },
                ]
            }).then(async (channel) => {
                const newTicketSchema = await ticketSchema.create({
                    GuildID: interaction.guild.id,
                    MembersID: interaction.member.id,
                    TicketID: ticketId,
                    ChannelID: channel.id,
                    Closed: false,
                    Locked: false,
                    Type: interaction.customId,
                    Claimed: false
                });

                const embed = new EmbedBuilder()
                .setTitle("Hi, Welcome to your Ticket!")
                .setDescription("A staff member will be with you in a few moments, please be patient.\nWhile a staff member is assisting you, please comment your problem. Again, please be patient!")
                .setColor(abc.colors.green)

                const button = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                    .setCustomId('close')
                    .setLabel('Close')
                    .setEmoji('🔒')
                    .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                    .setCustomId("claim")
                    .setLabel('Claim')
                    .setEmoji('📌')
                    .setStyle(ButtonStyle.Secondary),                  
                )

                channel.send({ embeds: [embed], components: [button] });

                interaction.reply({ content: `${abc.icons.checkmark} Your ticket has been successfully created in <#${channel.id}>.`, ephemeral: true })
            });
        } catch(err) {
            return console.log(err);
        }
    }
}