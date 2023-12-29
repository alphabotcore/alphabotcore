const { model, Schema } = require('mongoose');

let ticketSetup = new Schema({
    GuildID: String,
    Channel: String,
    Category: String,
    Transcripts: String,
    Everyone: String,
    Description: String
});

module.exports = model("TicketSetup", ticketSetup);