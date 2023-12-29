const { SlashCommandBuilder, ChatInputCommandInteraction, Client, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const ticketSchema = require('../../../models/createTickets.js');
const abc = require('alphabotcore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lock-ticket")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .setDescription("Lock a ticket."),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const data = await ticketSchema.findOne({ ChannelID: interaction.channel.id });

        if (!data) return;

        const embed = new EmbedBuilder()
            .setColor(abc.colors.green)

        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) return interaction.reply({ content: `You do not have permission to do this.`, ephemeral: true });

        if (data.Locked === true) return interaction.reply({ content: `${abc.icons.crossmark} This ticket is already set to \`Locked\``, ephemeral: true });
        await ticketSchema.updateOne({ ChannelID: interaction.channel.id }, { Locked: true });
        embed.setDescription(`${abc.icons.checkmark} The ticket was locked succesfully.`)

        data.MembersID.forEach((m) => {
            interaction.channel.permissionOverwrites.edit(m, { SendMessages: false });
        })

        return interaction.reply({ embeds: [embed] });
    }
}