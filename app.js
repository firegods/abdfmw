const Discord = require("discord.js");
const bot = new Discord.Client({ fetchAllMembers: true });
const fs = require("fs");
const moment = require("moment");
const chalk = require("chalk");
const clk = new chalk.constructor({ enabled: true });

//load config attemp
try{
  bot.config = require("./config.json");
} catch (e) {
  if(process.env.botToken) {
    bot.config = {
      botToken: process.env.botToken,
      prefix: process.env.prefix,
      ownerid: process.env.ownerid
    };
  } else {
    throw "NO CONFIG FILE FOUND, NO ENV CONF FOUND, EXITING";
  }
}

//extend bot
bot.log = msg => {console.log(`${clk.bgBlue(`[${moment().format("YYYY-MM-DD HH:mm:ss")}]`)} ${msg}`);};
bot.functions = {};
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.commandInhibitors = new Discord.Collection();

//load core functions
fs.readdir("./functions/core", (err, files) => {
  bot.functions.core = {};
  if (err) console.error(err);
  files.forEach(f=> {
    let name = f.split(".")[0];
    bot.functions.core[name] = require(`./functions/core/${f}`);
  });
  bot.log(`Loaded ${files.length} core functions`);
  bot.functions.core.loadOptionalFunctions(bot);
  bot.functions.core.loadCommands(bot);
  bot.functions.core.loadCommandInhibitors(bot);
  bot.functions.core.loadEvents(bot);
});

//message event
bot.on("message", msg => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(bot.config.prefix)) return;
  let command = msg.content.split(" ")[0].slice(bot.config.prefix.length);
  let params = msg.content.split(" ").slice(1);
  let cmd;
  if (bot.commands.has(command)) {
    cmd = bot.commands.get(command);
  } else if (bot.aliases.has(command)) {
    cmd = bot.commands.get(bot.aliases.get(command));
  }
  if (cmd) {
    bot.functions.core.runCommandInhibitors(bot, msg, cmd)
    .then(() => {
      cmd.run(bot, msg, params);
    });
  }
});

//ready event
bot.on("ready", () => {
  bot.log(`${bot.user.username}: Ready to serve ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} servers.`);
});

//error and warn

  //error
bot.on("error", console.error);

  //warn
bot.on("warn", console.warn);

//login
bot.login(bot.config.botToken);