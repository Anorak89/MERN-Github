const express = require("express");
const usersRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.post("/", async (req, res) => {
    const { username, name, password } = req.body;
    if (!username || username.length < 2) {
      return res
        .status(400)
        .json({ error: "Username required. Minimum 2 characters" });
    }
    if (!password || password.length < 4) {
      return res
        .status(400)
        .json({ error: "Password required. Minimum 4 characters" });
    }
    
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      name,
      passwordHash,
      playlists: [],
    });
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      return res.status(400).json({ error: "Username already exists in the database. Please choose another username" });
    }
  });

usersRouter.get("/", async (req, res) => {
    const users = await User.find({}).populate("playlists", { name: 1, creator: 1, numOfSongs: 1, likes: 1, id: 1 });
    res.json(users);
  });

module.exports = usersRouter;