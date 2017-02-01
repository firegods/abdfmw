exports.run = (bot, member) => {
    let guild = member.guild;
    console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
    guild.defaultChannel.sendMessage(`Welcome, @<${member.user.id}> to the server! We hope you enjoy your stay!`);
};