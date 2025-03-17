require("dotenv").config();
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minLength: 3, unique: true },
  passwordHash: String,
  name: String,
  playlists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Playlist",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User