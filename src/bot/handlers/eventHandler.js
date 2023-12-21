const { Client } = require("discord.js");
const fs = require("fs");
require("colors");
const { join } = require('node:path');



/**
 * @param {Client} client
 */

function eventListener(client) {

    const path = join(process.cwd(), 'src', 'bot', 'listeners', 'app');
    const files = fs.readdirSync(path).filter((file) => file.endsWith('.js'));

    for (const file of files) {
        const listener = require(`../listeners/app/${file}`);

        if (listener.rest) {
            if (listener.once) client.rest.once(listener.name, (...args) => listener.execute(...args, client));
            else client.rest.on(listener.name, (...args) => listener.execute(...args, client))
        } else {
            if (listener.once) client.once(listener.name, (...args) => listener.execute(...args, client));
            else client.on(listener.name, (...args) => listener.execute(...args, client))
        }

        console.log("[Event] ".red + `${file}`.red + ` successfully uploaded.`);
    }
}

module.exports = { eventListener };