const { Client } = require("discord.js");
const fs = require("fs");
require("colors");
const { join } = require('node:path');



/**
 * @param {Client} client
 */

function commandListener(client) {
    let commandArray = [];

    const path = join(process.cwd(), 'commands');
    const foldermain = fs.readdirSync(path);

    for (const folders of foldermain) {
        const path = join(process.cwd(), 'commands', `${folders}`);
        const files = fs.readdirSync(path).filter((file) => file.endsWith('.js'));

        for (const file of files) {
            const command = require(`../commands/${folders}/${file}`);

            client.commands.set(command.data.name, command);
            commandArray.push(command.data.toJSON());

            console.log("[Command] ".yellow + `${command.data.name}`.yellow + ` successfully uploaded.`);
        }

        client.application.commands.set(commandArray);
    }
}

module.exports = { commandListener };