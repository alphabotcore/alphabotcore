const { Client } = require("discord.js");
const fs = require("fs");
require("colors");
const { join } = require('node:path');

/**
 * @param {Client} client
 */

function eventListener(client) {
    const prinpath = join(process.cwd(), 'events', 'discord');
    const principal = fs.readdirSync(prinpath);

    for (const folders of principal) {

        const filespath = join(process.cwd(), 'events', `discord`, `${folders}`);
        const files = fs.readdirSync(filespath).filter((file) => file.endsWith('.js'));

        for (const file of files) {
            const event = require(`../events/discord/${folders}/${file}`);

            if (event.rest) {
                if (event.once)
                    client.rest.once(event.name, (...args) =>
                        event.execute(...args, client)
                    );
                else
                    client.rest.on(event.name, (...args) =>
                        event.execute(...args, client)
                    );
            } else {
                if (event.once)
                    client.once(event.name, (...args) => event.execute(...args, client));
                else client.on(event.name, (...args) => event.execute(...args, client));
            }
            console.log(`[Event] ${event.name}`.red + ` successfully uploaded.`);
        }
    }
}

module.exports = { eventListener };