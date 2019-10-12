const express = require("express");
const logger = require("./logger");

const app = express();

app.all("*", (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res) => {
  logger.error(err.message);
  logger.error(err.stack);

  res.json({ error: err.errorMessage || "Unknown error" });
});

// Listen to the port from the environment variable, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}...`);
});

function shutDown() {
  process.exit(0);
}

process.on("SIGTERM", () => {
  logger.error(
    "Got SIGTERM. I am gracefully shutting down, ",
    new Date().toISOString(),
  );
  shutDown();
});

process.on("SIGINT", () => {
  logger.error(
    "Got SIGINT. I am gracefully shutting down, ",
    new Date().toISOString(),
  );
  shutDown();
});

process.on("uncaughtException", err => {
  logger.error(
    "Got uncaughtException. I am gracefully shutting down, ",
    new Date().toISOString(),
    err,
  );
  shutDown();
});
