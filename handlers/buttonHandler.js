const { Client } = require("discord.js");
const fs = require("fs");
require("colors");
const { join } = require('node:path');

/**
 * @param {Client} client
 */

async function buttonsListener(client) {
    await client.buttons.clear();

    const path = join(process.cwd(), 'buttons');
    const foldermain = fs.readdirSync(path);

    for (const folder of foldermain) {

        const fil = join(process.cwd(), 'buttons', `${folder}`);
        const files = fs.readdirSync(fil).filter((file) => file.endsWith('.js'));

        for (const file of files) {
            const button = require(`../buttons/${folder}/${file}`);

            client.buttons.set(button.data.name, button);

            console.log(`[Buttons] ${button.data.name}`.yellow + ` successfully uploaded.`);
        }
    }
}


module.exports = { buttonsListener };