import Post from "./../models/postModel.js";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
const createPost = async (req, res) => {
  const { postedBy, postTitle } = req.body;
  let { img } = req.body;
  try {
    if (!postedBy || !postTitle) {
      return res.status(400).json({ error: "postTitle is required" });
    }
    const user = await User.findById(postedBy);
    if (!user) {
      return res.status(404).json({ error: "  user not found" });
    }
    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: " not authorized" });
    }
    const maxLength = 500;
    if (postTitle.length > maxLength) {
      return res
        .status(500)
        .json({ error: `  title must not exceed ${maxLength} characters` });
    }
    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }
    const newPost = new Post({
      postedBy,
      postTitle,
      img,
    });
    await newPost.save();
    res.status(201).json({ message: "post created succesfully", newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("occured error: " + error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: "Not authorized to delete post" });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("An error occurred: " + error.message);
    res.status(500).json({ error: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ message: "Post found", post });
  } catch (error) {
    console.error("An error occurred: " + error.message);
    res.status(500).json({ error: error.message });
  }
};

const feedPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const following = user.following;
    const posts = await Post.find({ postedBy: { $in: following } }).sort({
      createdAt: -1,
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const likeUnlikePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;
    const post = await Post.findById(postId);

    if (!post) {
      res.status(404).json({ error: "No post found" });
    }
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      res.status(200).json({ message: "Post unliked succesfully" });
    } else {
      post.likes.push(userId);
      await post.save();
      res.status(200).json({ message: "Post liked succesfully" });
    }
  } catch (error) {
    console.log(req.user);
    console.error("An error occurred: " + error.message);
    res.status(500).json({ error: error.message });
  }
};

const repliesToPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    const text = req.body.text;
    const userProfilePic = req.user.profilePic;
    const username = req.user.username;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const reply = { text, userProfilePic, username, userId };
    post.replies.push(reply);
    post.save();
    res.status(200).json({ message: "Reply added succesfully" });
  } catch (error) {
    console.error("An error occurred: " + error.message);
    res.status(500).json({ error: error.message });
  }
};
export {
  createPost,
  deletePost,
  getPost,
  likeUnlikePost,
  repliesToPost,
  feedPosts,
};
