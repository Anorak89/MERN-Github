// require dotenv
require("dotenv").config();
// require mongoose
const mongoose = require("mongoose");

const config = require("../utils/config");


const DB_URI = config.dbUri;
// mongoose setup and connection
mongoose.set("strictQuery", false);
mongoose
  .connect(DB_URI)
  .then(() => console.log("DB Connection Established"))
  .catch((e) => {
    console.log("Error connecting the DB: ", e.message);
  });
// create movie schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 2 },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
    required: true,
    minLength: 2,
  },
});
// configure toJSON method
contactSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

// create mongoose model
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;