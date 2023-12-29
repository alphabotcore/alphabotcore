const { SlashCommandBuilder, ChatInputCommandInteraction, Client, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const ticketSchema = require('../../../models/createTickets.js');
const abc = require('alphabotcore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unlock-ticket")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .setDescription("Unlock a ticket."),
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

        if (data.Locked === false) return interaction.reply({ content: `${abc.icons.crossmark} This ticket is already set to \`Locked\``, ephemeral: true });
        await ticketSchema.updateOne({ ChannelID: interaction.channel.id }, { Locked: false });
        embed.setDescription(`${abc.icons.checkmark} The ticket was unlocked succesfully.`)

        data.MembersID.forEach((m) => {
            interaction.channel.permissionOverwrites.edit(m, { SendMessages: true });
        })

        return interaction.reply({ embeds: [embed] });
    }
}