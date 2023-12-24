const { Client } = require("discord.js");
const fs = require("fs");
require("colors");
const { join } = require('node:path');

/**
 * @param {Client} client
 */

async function menusListener(client) {
    await client.menus.clear();

    const path = join(process.cwd(), 'menu');
    const foldermain = fs.readdirSync(path);

    for (const folder of foldermain) {

        const fil = join(process.cwd(), 'menu', `${folder}`);
        const files = fs.readdirSync(fil).filter((file) => file.endsWith('.js'));

        for (const file of files) {
            const menu = require(`../menu/${folder}/${file}`);

            client.menus.set(menu.data.name, menu);

            console.log(`[SelectMenu] ${menu.data.name}`.yellow + ` successfully uploaded.`);
        }
    }
}


module.exports = { menusListener };