const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const ticketSchema = require('../../../models/createTickets.js');
const abc = require('alphabotcore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("remove")
        .setDescription("Remove members from the ticket.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addUserOption(option => option.setName("target").setDescription("Select a member from the server to perform the action on.").setRequired(true)),
    async execute(interaction, client) {
        const target = interaction.options.getUser('target');

        const RemovedEmbed = new EmbedBuilder()
            .setDescription(`${abc.icons.checkmark} The user ${target} was successfully removed from the ticket.`)
            .setColor(abc.colors.green)

        const data = await ticketSchema.findOne({ GuildID: interaction.guild.id, ChannelID: interaction.channel.id });
        if (!data) return interaction.reply({ content: `${abc.icons.crosmark} An error has occurred, please try again later...`, ephemeral: true });

        data.MembersID.remove(target.id);

        interaction.channel.permissionOverwrites.edit(target.id, {
            SendMessages: false,
            ViewChannel: false,
            ReadMessageHistory: false
        });

        interaction.reply({ embeds: [RemovedEmbed] });

        data.save();
    }
}