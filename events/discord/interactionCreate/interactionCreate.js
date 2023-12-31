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

        } else if (interaction.isStringSelectMenu()){

            const menu = client.menus.get(interaction.customId);
            if (!menu) return new Error(`MenuError: This menu does not have a code assigned to it.`)

            await menu.execute(interaction, client);

        } else if (interaction.isUserContextMenuCommand()) {

            const contextCommand = client.commands.get(interaction.commandName);
            if(!contextCommand) return;
            
            try {
                await contextCommand.execute(interaction, client);
            } catch (error) {
                console.error(error)
            }
        }
    }
}