const winston = require("winston");

const customFormat = winston.format.printf(
  info => `${info.timestamp} [${info.level}] ${info.message}`,
);

let logLevel = "info";
if (
  // default to debug in development
  process.env.NODE_ENV === "development" ||
  process.env.LOG_LEVEL === "debug"
) {
  logLevel = "debug";
} else if (process.env.LOG_LEVEL === "info") {
  logLevel = "info";
}

const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        customFormat,
      ),
    }),
  ],
});

module.exports = logger;
