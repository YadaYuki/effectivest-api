const log4js = require("log4js");
if (process.env.NODE_ENV === "production") {
  var date = new Date();
  log4js.configure({
    appenders: {
      production:
        { type: 'file', filename: "./log/logger-" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + ".log" },
    },
    categories: {
      default: { appenders: ['production'], level: 'info' }
    }
  });
  loggerjs = log4js.getLogger("production");
}
loggerjs = log4js.getLogger();
loggerjs.level = 'debug'
loggerjs.debug("startApp");
module.exports = loggerjs;