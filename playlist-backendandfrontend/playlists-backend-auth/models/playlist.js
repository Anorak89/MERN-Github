require("dotenv").config();
const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  name: String,
  creator: String,
  numOfSongs: Number,
  likes: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

playlistSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist