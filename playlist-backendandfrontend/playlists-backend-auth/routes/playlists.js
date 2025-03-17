const express = require("express");
const jwt = require("jsonwebtoken");
const playlistRouter = express.Router();
const Playlist = require("../models/playlist");
const User = require("../models/user");
const { tokenPayloadExtractor } = require("../utils/middleware");

const extractToken = (req) => {
  const authHeader = req.get("authorization");
  if (!authHeader) return null;
  return authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
};

playlistRouter.get("/", async (req, res, next) => {
    const playlists = await Playlist.find({}).populate("userId", { username: 1, name: 1 , id: 1});
    res.json(playlists);

});
  
playlistRouter.post("/", async (req, res) => {
    const { name, creator, numOfSongs, likes } = req.body;
    let tokenPayload;
    try {
        tokenPayload = jwt.verify(extractToken(req), process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({ error: "Token not provided" });
    }
    if (!tokenPayload.id) return res.status(401).json({ error: "invalid token" });
  
    const userId = tokenPayload.id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User could not be found" });
    }
    console.log(name, creator, numOfSongs)
    if (!name || !creator || !numOfSongs) {
      return res.status(400).json({ error: "Name, creator, and Number of songs are required fields" });
    } else {
      const playlist = new Playlist({ name:name, creator:creator, numOfSongs:numOfSongs, likes: likes || 0, userId:userId });
      const savedPlaylist = await playlist.save();
      user.playlists = [...user.playlists, savedPlaylist._id];
      await user.save();
      res.json(savedPlaylist);
    }
});

playlistRouter.post("/:id/like", async (req, res) => {
  const playlistId = req.params.id;

  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    return res.status(404).json({ error: "Playlist could not be found" });
  }

  playlist.likes += 1

  await playlist.save()

  res.json({ newLikes: playlist.likes })
})

playlistRouter.delete("/:id", async (req, res) => {
    let tokenPayload;
    try {
      tokenPayload = jwt.verify(extractToken(req), process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ error: "no token provided"})
    }
    if (!tokenPayload.id) return res.status(401).json({ error: "invalid token" });
    const playlistId = req.params.id;
    const userId = tokenPayload.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    if (playlist.userId.toString() !== userId) {
      return res.status(403).json({ error: "You do not have permission to delete this playlist" });
    }

    const removedPlaylist = await Playlist.findByIdAndDelete(playlistId);
    user.playlists = user.playlists.filter(id => id.toString() !== playlistId);
    await user.save();

    res.status(200).json({ message: `Playlist ${removedPlaylist.name} has been removed` });
});

module.exports = playlistRouter;