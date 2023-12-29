const { PermissionFlagsBits } = require('discord.js');

const ModerationPerms = [
    PermissionFlagsBits.BanMembers,
    PermissionFlagsBits.KickMembers,
    PermissionFlagsBits.ChangeNickname,
    PermissionFlagsBits.ManageChannels,
    PermissionFlagsBits.ManageMessages,
    PermissionFlagsBits.ManageNicknames,
    PermissionFlagsBits.ManageRoles,
    PermissionFlagsBits.ModerateMembers,
    PermissionFlagsBits.MuteMembers,
    PermissionFlagsBits.ViewAuditLog,
    PermissionFlagsBits.MoveMembers,
    PermissionFlagsBits.ManageThreads,
    PermissionFlagsBits.DeafenMembers
];

module.exports = ModerationPerms;