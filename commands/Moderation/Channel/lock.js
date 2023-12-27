const { SlashCommandBuilder, ChatInputCommandInteraction, Client, PermissionFlagsBits } = require('discord.js');
const abc = require('alphabotcore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lock")
        .setDescription("Locks a channel by selecting it from the command.")
        .addChannelOption(option => option.setName('channel').setDescription('Select a channel to lock.').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const channel = interaction.options.getChannel('channel');
        const everyone = interaction.guild.roles.cache.find((rol) => rol.name === "@everyone");

        channel.permissionOverwrites.edit(everyone.id, { ViewChannel: false, SendMessages: false })
        interaction.reply({ content: `${abc.icons.checkmark} The channel has been correctly locked, use </unlock:1189603797807398952> to unlock it.`, ephemeral: true })
    }
}