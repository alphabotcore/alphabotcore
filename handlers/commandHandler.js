const { Client } = require("discord.js");
const fs = require("fs");
require("colors");
const { join } = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('../config/config.json');

/**
 * @param {Client} client
 */

async function commandListener(client) {

    const path = join(process.cwd(), 'commands');
    const foldermain = fs.readdirSync(path);

    for (const folders of foldermain) {

        const foldmin = join(process.cwd(), 'commands', `${folders}`);
        const foldermin = fs.readdirSync(foldmin);

        for (const folder of foldermin) {

            const fil = join(process.cwd(), 'commands', `${folders}`, `${folder}`);
            const files = fs.readdirSync(fil).filter((file) => file.endsWith('.js'));

            for (const file of files) {
                const command = require(`../commands/${folders}/${folder}/${file}`);

                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());

                console.log(`[Command] ${command.data.name}`.cyan + ` successfully uploaded.`);
            }
        }
    }

    const rest = new REST({ version: "9" }).setToken(config.bot.token);
    try {
        console.log("[Rest] ".green + "Reloaded application (/) commands");
        
        await rest.put(Routes.applicationCommands(config.bot.botId), {
            body: client.commandArray
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = { commandListener };