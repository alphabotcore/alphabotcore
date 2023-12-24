const { Events, Client, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client
    */
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {

            const command = client.commands.get(interaction.commandName);
            if (!command) return interaction.reply({ content: "outdated command" });

            command.execute(interaction, client);

        } else if (interaction.isButton()) {
            const button = client.buttons.get(interaction.customId);
            if (!button) return new Error(`ButtonError: This button does not have a code assigned to it.`)

            await button.execute(interaction, client);

        }
    }
}