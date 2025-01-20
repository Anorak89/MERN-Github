const express = require("express");
const app = express();
const cors = require("cors");
const {errorHandler, requestLogger} = require("./utils/middleware");
// Movie model
const contactsRouter = require("./routes/contacts");
const Contact = require("./models/contact");

const mongoose = require("mongoose");

const config = require("./utils/config");


const DB_URI = config.dbUri;
// mongoose setup and connection
mongoose.set("strictQuery", false);
mongoose
  .connect(DB_URI)
  .then(() => console.log("DB Connection Established"))
  .catch((e) => {
    console.log("Error connecting the DB: ", e.message);
  });


// middleware for parsing body into js object
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));



// utilize requestLogger middleware
app.use(requestLogger);
app.use("/api/contacts", contactsRouter)


app.get("/", (req, res) => {
  res.send("Whats up");
});

app.use(errorHandler);

module.exports = app;