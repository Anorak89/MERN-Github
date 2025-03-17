const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const playlistsRouter = require("./routes/playlists");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login")

const logger = require("./utils/logger");
const config = require("./utils/config");
const { requestLogger, errorHandler, tokenPayloadExtractor } = require("./utils/middleware");

require('dotenv').config();

const dbUrl = config.dbUri;
mongoose
    .connect(dbUrl)
    .then(() => {logger.log("DB Connection Established")})
    .catch((e) => {logger.error("DB Connection Failed", e.message)}
    );

app.use(cors());
app.use(express.json());
app.use("/api/playlists", playlistsRouter);
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

app.use(requestLogger);
app.use(errorHandler);
app.use(tokenPayloadExtractor)

module.exports = app