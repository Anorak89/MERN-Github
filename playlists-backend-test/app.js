const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const config = require("./utils/config");
const dbUrl = config.dbUri;
const logger = require("./utils/logger")
const playlistsRouter = require("./routes/playlists");
const { errorHandler, requestLogger } = require("./utils/middleware");


mongoose.set("strictQuery", false);

mongoose
  .connect(dbUrl)
  .then(() => logger.log("DB Connection Established"))
  .catch((e) => {
    logger.log("Error connecting the DB: ", e.message);
  });

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use(requestLogger);
app.use("/api/playlists", playlistsRouter);


app.get("/", (req, res) => {
  res.send("Whats up");
});
app.use(errorHandler);


module.exports = app;