const inspect = require('util').inspect;

exports.run = (bot, msg, [code]) => {
  try {
    let evaled = eval(code);
    if (typeof evaled !== "string") {
      evaled = inspect(evaled);
    }
    msg.channel.sendMessage("```js\n" + "---INPUT---\n" + code + "\n" + "---OUTPUT---\n" +  bot.functions.core.clean(bot, evaled) + "\n```");
  } catch (err) {
    msg.channel.sendMessage(`\`ERROR\` \`\`\`xl\n${
      bot.functions.clean(bot, err)
      }\n\`\`\``);
    if (err.stack) bot.functions.core.log(err.stack, "error");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ev"],
  permLevel: 4
};

exports.help = {
  name: "eval",
  description: "Evaluates javascript code snippets",
  usage: "<expression:str>",
  category: 'Owner Utilites'
};
