import Post from "../models/POST.js";
import User from "../models/USER.js";
import {hashSync,compareSync} from "bcrypt"

export const createNewUser = async (req, res) => {
  const { username, password, userimage } = req.body;
  if (!username || !password || !userimage) {
    res.status(400).json({ message: "bad Request" });
  }
  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res.status(400).json({ message: "Username already exist" });
  }
  let hashedPassword = hashSync(password)
  const user = new User({
    username: username,
    password: hashedPassword,
    userimage: userimage,
  });
  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ user: user });
};
export const LogIn = async (req, res) => {
  const { username, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ username });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User does not exist" });
  }
  let isCorrectPassword = compareSync(password,existingUser.password)
  if (!isCorrectPassword) {
    return res.status(403).json({ message: "Wrong password --Forbidden" });
  }
  return res.status(200).json({ existingUser });
};

export const getUserPosts = async (req, res) => {
  const { userId } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(userId);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User does not exist" });
  }
  let userPosts = [];
  for (let id of existingUser.posts) {
    let userPost = await Post.findById(id);
    userPosts.push(userPost);
  }
  return res.status(200).json({ userPosts });
};

export const SearchUser = async (req, res) => {
  const { searchText } = req.body;
  if (!searchText) {
    return res.status(400).json({ message:"bad request"});
  }
  try {
    const result = await User.find({username:searchText});
    return res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
