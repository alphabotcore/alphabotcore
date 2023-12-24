const { Events, Client, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
    */
    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if(!command) return interaction.reply({ content: "outdated command" });

        command.execute(interaction, client);
    }
}