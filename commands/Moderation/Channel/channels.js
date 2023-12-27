const { SlashCommandBuilder, ChatInputCommandInteraction, Client, ChannelType } = require('discord.js');
const abc = require('alphabotcore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("channels")
        .setDescription("Create or delete channels.")
        .addSubcommand(subcommand => subcommand
            .setName("create")
            .setDescription("Creates a channel from the server.")
            .addStringOption(option => option.setName('name').setDescription('Write the channel name.').setRequired(true))
            .addStringOption(option => option
                .setName('type')
                .setDescription('Select a channel type.')
                .setRequired(true)
                .addChoices(
                    { name: 'Text', value: 'GuildText' },
                    { name: 'Voice', value: 'GuildVoice' },
                    { name: 'Announcements', value: 'GuildAnnouncement' },
                    { name: 'Forum', value: 'GuildForum' },
                    { name: 'Stage', value: 'GuildStageVoice' },
                )
            ),
        )
        .addSubcommand(subcommand => subcommand
            .setName("delete")
            .setDescription("Deletes a channel from the server.")
            .addStringOption(option => option.setName('id').setDescription('Paste the channel id.').setRequired(true)),
        ),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        switch (interaction.options.getSubcommand()) {
            case "create":
                const name = interaction.options.getString('name');
                const type = interaction.options.getString('type');
                
                switch (type) {
                    case "GuildText":
                        interaction.guild.channels.create({
                            name: `${name}`,
                            type: ChannelType.GuildText
                        });
                        interaction.reply({ content: `${abc.icons.checkmark} The channel has been successfully created.`, ephemeral: true });
                        break;
                    case "GuildVoice":
                        interaction.guild.channels.create({
                            name: `${name}`,
                            type: ChannelType.GuildVoice
                        });
                        interaction.reply({ content: `${abc.icons.checkmark} The channel has been successfully created.`, ephemeral: true });
                        break;
                    case "GuildAnnouncement":
                        interaction.guild.channels.create({
                            name: `${name}`,
                            type: ChannelType.GuildAnnouncement
                        });
                        interaction.reply({ content: `${abc.icons.checkmark} The channel has been successfully created.`, ephemeral: true });
                        break;
                    case "GuildForum":
                        interaction.guild.channels.create({
                            name: `${name}`,
                            type: ChannelType.GuildForum
                        });
                        interaction.reply({ content: `${abc.icons.checkmark} The channel has been successfully created.`, ephemeral: true });
                        break;
                    case "GuildStageVoice":
                        interaction.guild.channels.create({
                            name: `${name}`,
                            type: ChannelType.GuildStageVoice
                        });
                        interaction.reply({ content: `${abc.icons.checkmark} The channel has been successfully created.`, ephemeral: true });
                        break;
                }

                break;

            case "delete":
                const id = interaction.options.getString('id');

                interaction.guild.channels.delete(id);
                interaction.reply({ content: `${abc.icons.checkmark} The channel has been successfully deleted.`, ephemeral: true });

                break;
        
            default:
                break;
        }
    }
}