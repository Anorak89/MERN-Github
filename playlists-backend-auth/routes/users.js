const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;
  if(!username){
    return res
      .status(400)
      .json({error:"Username is required"});
  }
  if (username.length < 2) {
    return res
      .status(400)
      .json({ error: "Username must be at least 2 characters" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: "Password is required" });
  }
  if (password.length < 4) {
    return res
      .status(400)
      .json({ error: "Password must be at least 4 characters" });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    name,
    passwordHash,
  });
  const savedUser = await newUser.save();
  res.status(201).json(savedUser);
});

usersRouter.get("/", async (req,res)=> {
    const users = await User.find({}).populate("playlists", {name: 1, numOfSongs: 1, likes: 1,});
    res.json(users);
})

module.exports = usersRouter;