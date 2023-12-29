const { SlashCommandBuilder, ChatInputCommandInteraction, Client, PermissionFlagsBits } = require('discord.js');
const core = require('alphabotcore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("addemoji")
        .setDescription("Add a emoji for the server.")
        .addStringOption(option => option.setName('name').setDescription('The name of the emoji.').setRequired(true))
        .addAttachmentOption(option => option.setName("file").setDescription("Upload the file to make it an emoji.").setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const upload = interaction.options.getAttachment('file');
        const name = interaction.options.getString('name');

        await interaction.reply({ content: "Loading your emoji...", ephemeral: true });

        const emoji = await interaction.guild.emojis.create({ attachment: `${upload.attachment}`, name: `${name}` }).catch(err => {
            setTimeout(() => {
                console.log(err);
                return interaction.editReply({ content: `${err.rawError.name}`, ephemeral: true });
            }, 2000);
        });

        setTimeout(() => {
            if(!emoji) return;

            interaction.editReply({ content: `${core.icons.checkmark} Your emoji has been added successfully: ${emoji}`, ephemeral: true })

        }, 3000);
    }
}