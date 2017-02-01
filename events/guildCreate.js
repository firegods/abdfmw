exports.run = (bot, guild) => {
    guild.defaultChannel.sendMessage(`Joined ${guild.name}`);
};