const Discord = require('discord.js');
exports.run = (bot, msg, params) => {
  let command;
  if (bot.commands.has(params[0])) {
    command = params[0];
  } else if (bot.aliases.has(params[0])) {
    command = bot.aliases.get(params[0]);
  }
  if (!command) {
    const undefinedEmbed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .addField('Unable to reload command', `Could not find command ${params[0]}`)
    msg.channel.sendEmbed(undefinedEmbed);
  } else {
        delete require.cache[require.resolve(`./${command}.js`)];
        const relEmbed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .addField('Reload Successful', `Successfully reloaded command: ${command}`)
        msg.channel.sendEmbed(relEmbed)
      .catch(e => {
        msg.channel.sendMessage(`Command reload failed: ${command}\n\`\`\`${e.stack}\`\`\``);
      });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 4
};

exports.helpcmd = {
  name: "reload",
  description: "Reloads specified command",
  usage: "reload <commandname>"
};