function sensitivePattern(bot) {
  if (!this.sensitivePattern) {
    let pattern = "";
    if (bot.token) pattern += bot.token;
    if (bot.token) pattern += (pattern.length > 0 ? "|" : "") + bot.token;
    if (bot.email) pattern += (pattern.length > 0 ? "|" : "") + bot.email;
    if (bot.password) pattern += (pattern.length > 0 ? "|" : "") + bot.password;
    this.sensitivePattern = new RegExp(pattern, "gi");
  }
  return this.sensitivePattern;
}

module.exports = (bot, text) => {
  if (typeof (text) === "string") {
    if (bot.user.email) {
      text.replace(bot.user.email, "ã€Œï½’ï½…ï½„ï½ï½ƒï½”ï½…ï½„ã€");
    }
    return text.replace(sensitivePattern(bot), "ã€Œï½’ï½…ï½„ï½ï½ƒï½”ï½…ï½„ã€").replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);
  }
  return text;
};