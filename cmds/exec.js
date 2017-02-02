const exec = require("child_process").exec;

exports.run = (bot, msg, [code]) => {
  exec(code, (e, out, err) => {
    if (out) {
      msg.channel.sendMessage(`\`OUTPUT\` \`\`\`xl\n${
      bot.functions.core.clean(bot, out)
      }\n\`\`\``);
    }
    if (err) {
      msg.channel.sendMessage(`\`ERROR\` \`\`\`xl\n${
      bot.functions.core.clean(bot, err)
      }\n\`\`\``);
    }
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ex"],
  permLevel: 4
};

exports.help = {
  name: "exec",
  description: "Executes console commands.",
  usage: "<expression:str>",
  category: 'Owner Utilities'
};