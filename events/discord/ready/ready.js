const { Events, Client, ChatInputCommandInteraction, PresenceUpdateStatus, ActivityType } = require('discord.js');
const mongoose = require('mongoose');
const config = require('../../../config/config.json');
require('colors');

module.exports = {
    name: Events.ClientReady,
    once: true,
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
    */
    async execute(interaction, client) {
        await mongoose.connect(config.bot.mongoose || '');
        if(mongoose.connect) {
            console.log(`☁ MongoDB connection successfully.`.blue)
        }
        
        console.log(`Logged as ${client.user.tag}.`.green)
        client.user.setPresence({ activities: [{ name: "v1.0.0 | AlphaBotCore © 2023", type: ActivityType.Custom }], status: PresenceUpdateStatus.Idle })
    }
}