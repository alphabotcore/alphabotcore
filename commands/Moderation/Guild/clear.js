const { SlashCommandBuilder, ChatInputCommandInteraction, Client, EmbedBuilder } = require('discord.js');
const abc = require('alphabotcore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Delete messages from a channel.")
        .addIntegerOption(option => option.setName('amount').setDescription('Amount of messages to clear.').setRequired(true))
        .addUserOption(option => option.setName('target').setDescription('Select a target to clean their messages.').setRequired(false)),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const amount = interaction.options.getInteger('amount');
        const user = interaction.options.getUser('target');

        const messages = await interaction.channel.messages.fetch({ limit: amount +1 });

        const res = new EmbedBuilder()
        .setColor(abc.colors.green)

        if(user) {
            let i = 0;
            const filtered = [];

            messages.filter((msg) => {
                if(msg.author.id === user.id && amount > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await interaction.channel.bulkDelete(filtered).then(messages => {
                res.setDescription(`${abc.icons.checkmark} Successfully deleted \`${messages.size}\` messages from ${user}`);
                interaction.reply({ embeds: [res], ephemeral: true });
            })
        } else {
            await interaction.channel.bulkDelete(amount, true).then(messages => {
                res.setDescription(`${abc.icons.checkmark} Successfully deleted \`${messages.size}\` messages from the channel.`);
                interaction.reply({ embeds: [res], ephemeral: true });
            })
        }
    }
}