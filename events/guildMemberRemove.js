exports.run = (bot, member) => {
    let guild = member.guild;
    console.log(`${member.user.username} has left "${member.guild.name}"` );
    guild.defaultChannel.sendMessage(`<@${member.user.id}> has left. They will be missed.`);
};