import Mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res, next) => {
  try {
    const postMessage = await PostMessage.find();
    console.log(postMessage);

    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res, next) => {
  const post = req.body;

  const newPost = new PostMessage(post);

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res, next) => {
  const { id: _id } = req.params;
  const post = req.body;

  // Checks if post id is from mongoDB
  if (Mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "No post with that id" });

  // Set new to true to receive updated version of that post
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatedPost);
};
