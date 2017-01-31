exports.run = (bot, msg, params) => {
    if (!params[0]) {
      msg.channel.sendCode("asciidoc", `= Command List =\n\n[Use <prefix>help <commandname> for details]\n\n${bot.commands.map(c=>`${c.helpcmdname}:: ${c.helpcmd.description}`).join("\n")}`);
  } else {
    let command = params[0];
    if(bot.commands.has(command)) {
      command = bot.commands.get(command);
      msg.channel.sendCode("asciidoc", `= ${command.helpcmd.name} = \n${command.helpcmd.description}\nusage::${command.helpcmd.usage}`);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0
};

exports.helpcmd = {
  name : "help",
  description: "Displays this message",
  usage: "help [command]"
};