const log4js = require("log4js");
if(process.env.NODE_ENV==="production"){
    var date = new Date();
    log4js.configure({
    appenders: { cheese: { type: 'file', filename: "logger-"+date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+".log" } },
    categories: { default: { appenders: [''], level: 'error' } }
  });
}
  loggerjs = log4js.getLogger();
  loggerjs.level = 'debug'
  loggerjs.debug("startApp");
  module.exports = loggerjs;