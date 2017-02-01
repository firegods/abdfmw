exports.conf = {
    enabled: true,
    spamProtection: false
};

exports.run = (bot, msg) => new Promise((resolve, reject) => {
    if (bot.config.selfbot == true) {
        if (msg.author == bot.user) {
            resolve();
        } else {
            reject();
        }
    } else {
        resolve();
    }
});