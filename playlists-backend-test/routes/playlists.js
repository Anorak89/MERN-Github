const express = require("express");
const playlistsRouter = express.Router();
const Playlist = require("../models/playlist");


playlistsRouter.post("/", async (req, res, next) => {
    try {
      const { name, creator, numOfSongs, likes } = req.body;
      if (!name || !creator) {
        return res.status(400).json({ error: "Name and creator are required" });
      } else {
        const playlist = new Playlist(req.body);
        const savedPlaylist = await playlist.save();
        res.status(201).json(savedPlaylist);
      }
    } catch (error) {
      next(error);
    }
  });


playlistsRouter.get("/", async (req, res) => {
    const playlists = await Playlist.find({});
    res.json(playlists);
});

module.exports = playlistsRouter;
