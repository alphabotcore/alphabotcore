const { Client, Events, ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, EmbedBuilder, ChannelType, PermissionFlagsBits, ButtonStyle } = require('discord.js');
const { createTranscript } = require('discord-html-transcripts');
const ticketSchema = require('../../../models/createTickets.js');
const ticketSetup = require('../../../models/createTicketSetup.js');
const abc = require('alphabotcore');

module.exports = {
    name: Events.InteractionCreate,
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
    */
    async execute(interaction, client) {
        //if(!interaction.isButton()) return;

        if(!["close", "claim"].includes(interaction.customId)) return;

        const docs = await ticketSetup.findOne({ GuildID: interaction.guild.id });
        if(!docs) return;

        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageChannels)) return interaction.reply({ content: `${abc.icons.crossmark} Missing Permissions for the bot: \`ManageChannels\``, ephemeral: true });

        const SuccessfullyEmbed = new EmbedBuilder()
        .setColor(abc.colors.green)

        const data = await ticketSchema.findOne({ GuildID: interaction.guild.id });
        if(!data) return;

        const fetchedMember = await interaction.guild.members.cache.get(data.MembersID);

        switch (interaction.customId) {
            case "close":
                if (data.Closed === true) return interaction.reply({ content: `${abc.icons.crossmark} This ticket is already getting deleted...`, ephemeral: true });

                const transcript = await createTranscript(interaction.channel, {
                    limit: -1,
                    returnBuffer: false,
                    filename: `${interaction.member.user.username}-ticket${data.Type}-${data.TicketID}.html`,
                });

                await ticketSchema.updateOne({ ChannelID: interaction.channel.id }, { Closed: true });

                const transcriptEmbed = new EmbedBuilder()
                    .setDescription(`${abc.icons.checkmark} Transcript successfully saved.`)
                    .setColor(abc.colors.green)
                    .setFooter({ text: interaction.member.user.tag, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                    .setTimestamp()
                    .addFields(
                        { name: "Type", value: `${data.Type}`, inline: true },
                        { name: "ID", value: `${data.TicketID}`, inline: true }
                    )


                const transcriptProcess = new EmbedBuilder()
                    .setDescription(`${abc.icons.checkmark} Saving and sending transcript to the DM...`)
                    .setFooter({ text: "Remember to have Direct Messages enabled." })
                    .setColor(abc.colors.purple)

                const res = await interaction.guild.channels.cache.get(docs.Transcripts).send({ embeds: [transcriptEmbed], files: [transcript] });
                interaction.channel.send({ embeds: [transcriptProcess] })

                const DeletedTicket = new EmbedBuilder()
                    .setDescription(`The ticket will be deleted in 10s...`)
                    .setColor(abc.colors.red)
                interaction.channel.send({ embeds: [DeletedTicket] })

                setTimeout(function () {
                    const transcriptSavedEmbed = new EmbedBuilder()
                        .setDescription(`${abc.icons.checkmark} You can access your transcript with this link: ${res.url}`)
                        .setColor(abc.colors.green)
                        .setTimestamp()

                    interaction.member.send({ embeds: [transcriptSavedEmbed, transcriptEmbed], files: [transcript] }).catch(() => interaction.channel.send(`${abc.icons.crossmark} Couldn't send transcript to \`Direct Messages\`.`));
                }, 10000);

                setTimeout(function () {
                    interaction.channel.delete();
                }, 10000)

                interaction.reply({ content: `${abc.icons.checkmark} Your ticket is being prepared for closing.` });
                break;

            case "claim":
                if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) return interaction.reply({ content: `${abc.icons.checkmark} You do not have permission to do this.`, ephemeral: true });

                if (data.Claimed == true) return interaction.reply({ content: `${abc.icons.crossmark} This ticket is already claimed by <@${data.ClaimedBy}>.`, ephemeral: true });

                await ticketSchema.updateOne({ ChannelID: interaction.channel.id }, { Claimed: true, ClaimedBy: interaction.member.id });

                const ClaimedEmbed = new EmbedBuilder()
                    .setDescription(`> From now on, ${interaction.member} will take care of this request.`)
                    .setColor(abc.colors.green)

                interaction.reply({ embeds: [ClaimedEmbed] })
                break;
        
            default:
                break;
        }
    }
}