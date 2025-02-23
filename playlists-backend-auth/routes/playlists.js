const express = require("express");
const playlistsRouter = express.Router();
const Playlist = require("../models/playlist");
const { tokenPayloadExtractor, userIdentifier } = require("../utils/middleware.js");

playlistsRouter.post("/", tokenPayloadExtractor, userIdentifier, async (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "invalid token" });
  const { name, creator, numOfSongs, likes } = req.body;
  if (!name) return res.status(400).json({ error: "Playlist Name is required" });
  if (!creator) return res.status(400).json({ error: "Creator is required" });
  if (!numOfSongs) return res.status(400).json({ error: "Number of Songs are required" });
  const playlist = new Playlist({ name, creator, numOfSongs, likes, user: req.user._id });
  const savedPlaylist = await playlist.save();
  req.user.playlists = [...req.user.playlists, savedPlaylist._id];
  await req.user.save();
  res.json(savedPlaylist);
});

playlistsRouter.delete("/:id", tokenPayloadExtractor, userIdentifier, async (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "invalid token" });
  const playlist = await Playlist.findById(req.params.id);
  if (!playlist) return res.status(404).json({ error: "playlist not found" });
  if (req.user._id.toString() !== playlist.user.toString()) return res.status(401).json({ error: "Unauthorized Access" });
  await Playlist.findByIdAndDelete(req.params.id);
  req.user.playlists = req.user.playlists.filter(playlistId => playlistId.toString() !== req.params.id);
  await req.user.save();
  res.status(200).json({ message: `The playlist [${playlist.name}] deleted successfully` });
});

playlistsRouter.get("/", async (req, res, next) => {
  const playlists = await Playlist.find({}).populate("user", { username: 1, name: 1 });
  res.json(playlists);
});

module.exports = playlistsRouter;
