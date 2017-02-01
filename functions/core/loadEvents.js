const fs = require('fs');

module.exports = bot => {
fs.readdir('./events', (err, files) => {
  if (bot.config.selfbot == true) return;
  if(err) return console.error(err);
  files.forEach(file=> {
    let eventFile = require(`../../events/${file}`);
    let eventName = file.split('.')[0];
    bot.on(eventName, (...params) => eventFile.run(bot, ...params));
  });
  if (files.length === 0) return;
  bot.log(`Loaded ${files.length} events`);
});
}