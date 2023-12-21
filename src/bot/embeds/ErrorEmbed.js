const { EmbedBuilder } = require('discord.js');

const ErrorEmbed = new EmbedBuilder()
.setTitle("An error has occurred!")
.setDescription("An error has occurred, check what you are doing!")
.setColor("Red")
.setTimestamp()

module.exports = { ErrorEmbed };