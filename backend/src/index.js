const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("./logger");
const { compress, decompress } = require("./deltaEncoder");

const app = express();

app.use(cors());
app.use((req, res, next) => {
  if (req.headers["content-type"] !== "text/plain") {
    res.sendStatus(415);
  } else {
    next();
  }
});

app.use(
  bodyParser.text({
    limit: "10mb",
  }),
);

app.post("/compress", (req, res, next) => {
  try {
    const result = compress(req.body);
    res.type("txt");
    res.send(result);
  } catch (err) {
    next(err);
  }
});

app.post("/decompress", (req, res, next) => {
  try {
    const result = decompress(req.body);
    res.type("txt");
    res.send(result);
  } catch (err) {
    next(err);
  }
});

app.all("*", (req, res) => {
  res.sendStatus(404);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.error(err.message);
  logger.error(err.stack);

  if (err.message === "Illegal argument") {
    res.sendStatus(400);
  } else {
    res.sendStatus(500);
  }
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
