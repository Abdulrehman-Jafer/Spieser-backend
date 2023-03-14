import Post from "../models/POST.js";
import User from "../models/USER.js";
import { deleteFromStore } from "../utils/delete image/delelteImage.js";

export const createNewPost = async (req, res) => {
  const { userId, caption, image } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(userId);
  } catch (error) {
    console.log(error);
  }
  if (!existingUser) {
    return res.status(401).json({ message: "unauthorized" });
  }
  const { username, userimage } = existingUser;
  const newPost = new Post({
    createdBy: { userId, userimage, username },
    caption: caption,
    image: image,
  });
  try {
    await newPost.save();
    const newPostId = newPost.id;
    existingUser.posts.push(newPostId);
    await existingUser.save();
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
  res.status(201).json({ post: newPost });
};

export const getAllPost = async (req, res) => {
  let Posts;
  try {
    Posts = await Post.find();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
  res.status(200).json({ Posts });
};
export const LikePost = async (req, res) => {
  const { postId, userId } = req.body;
  console.log(req.body);
  if (!postId || !userId) {
    return res.status(400).json({ message: "bad request" });
  }
  const post = await Post.findById(postId);
  if (post.likes.includes(userId)) {
    return res.status(400).json({ message: "Already liked the post" });
  }
  const user = await User.findById(userId);
  try {
    post.likes.push(userId);
    await post.save();
    user.likedPost.push(postId);
    await user.save();
    return res.status(200).json({ message: "Succesful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something do went wrong" });
  }
};

export const AddComment = async (req, res) => {
  const { username, userimage, commentBody, userId, postId } = req.body;
  let existingUser = await User.findById(userId);
  let existingPost = await Post.findById(postId);
  if (!existingUser || !existingPost) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    let comment = { username, userimage, commentBody, userId };
    existingPost.comments.push(comment);
    await existingPost.save();
    return res.status(201).json({ message: "Successfully commented" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export const getAllComments = async (req, res) => {
  const { postId } = req.body;
  let existingPost = await Post.findById(postId);
  if (!existingPost) {
    return res.status(400).json({ message: "bad request" });
  }
  return res.status(200).json({ comments: existingPost.comments });
};

export const deleteThePost = async (req, res) => {
  const { postId, userId } = req.params;
  let existingUser = await User.findById(userId);
  let existingPost = await Post.findById(postId);
  if (!postId || !userId) {
    return res.status(400).json({ message: "bad request" });
  }
  if (!existingUser.posts.includes(existingPost._id)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    await deleteFromStore(existingPost.image)
    await Post.deleteOne(existingPost);
    existingUser.posts.pull(postId);
    await existingUser.save();
    return res.status(200).json({ message: "Successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something Do went wrong" });
  }
};

export const saveThePost = async (req, res) => {
  const { postId, userId } = req.body;
  let existingPost = await Post.findById(postId);
  let existingUser = await User.findById(userId);
  if (!existingPost || !existingUser) {
    return res.status(400).json({ message: "bad request" });
  }
  if (existingUser.saved.includes(postId)) {
    return res.status(400).json({ message: "Already saved" });
  }
  try {
    existingUser.saved.push(postId);
    await existingUser.save();
    res.status(200).json({ message: "Successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getSavedPosts = async (req, res) => {
  const { userId } = req.params;
  let existingUser = await User.findById(userId);
  if (!existingUser) {
    return res.status(400).json({ message: "bad request" });
  }
  let savedPost = [];
  for (let post of existingUser.saved) {
    let saved = await Post.findById(post);
    savedPost.push(saved);
  }
  return res.status(200).json({ savedPost });
};
