const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const ticketSchema = require('../../../models/createTickets.js');
const abc = require('alphabotcore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("add")
        .setDescription("Add members to the ticket.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addUserOption(option => option.setName("target").setDescription("Select a member from the server to perform the action on.").setRequired(true)),
    async execute(interaction, client) {
        const target = interaction.options.getUser('target');
        const member = await interaction.guild.members.fetch(target.id);

        const AddedEmbed = new EmbedBuilder()
        .setDescription(`${abc.icons.checkmark} The user ${target} was successfully removed from the ticket.`)
        .setColor(abc.colors.green)

        const data = await ticketSchema.findOne({ GuildID: interaction.guild.id, ChannelID: interaction.channel.id });
        if (!data) return interaction.reply({ content: `${abc.icons.crosmark} An error has occurred, please try again later...`, ephemeral: true });
        
        data.MembersID.push(member.id);

        interaction.channel.permissionOverwrites.edit(target.id, {
            SendMessages: true,
            ViewChannel: true,
            ReadMessageHistory: true
        });

        interaction.reply({ embeds: [AddedEmbed] });

        data.save();
    }
}