import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import generateTokenAndSetCookie from "./utils/helper/generateTokenAndSetCookie.js";
import mongoose from "mongoose";
import Post from "../models/postModel.js";

const signupUser = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      username,
      password: hashedPassword,
      email,
    });

    await newUser.save();

    generateTokenAndSetCookie(newUser._id, res); // Set JWT token as cookie
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      username: newUser.username,
      bio: newUser.bio,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Occurred error: " + error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "User Not exist " });
    }
    const isMatch = await bcrypt.compare(password, user.password || " ");
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }
    generateTokenAndSetCookie(user._id, res); // Set JWT token as cookie
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Occurred error:" + error.message);
  }
};

const logoutUser = async (req, res) => {
  try {
    // Clear the cookie by setting it to an empty string and maxAge to 1 millisecond
    res.cookie("jwt", "", { maxAge: 1, httpOnly: true });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("An error occurred: " + error.message);
    res.status(500).json({ error: error.message });
  }
};

const followUnfollow = async (req, res) => {
  try {
    const id = req.params.id;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);
    if (id === req.user._id.toString()) {
      return res.status(400).json({ error: "Cannot follow self" });
    }
    if (!userToModify || !currentUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      res.status(200).json({ message: "User Unfollowed succesfully" });
    } else {
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      res.status(200).json({ message: "User followed succesfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("occured error: " + error.message);
  }
};

const updateUser = async (req, res) => {
  const { name, username, password, email, bio } = req.body;
  const userId = req.user ? req.user._id : null;
  let profilePic = req.body.profilePic;

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (userId.toString() !== req.params.id) {
      return res.status(403).json({ error: "Cannot update other's profile" });
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    if (profilePic && profilePic !== user.profilePic) {
      if (user.profilePic) {
        await cloudinary.uploader.destroy(
          user.profilePic.split("/").pop().split(".")[0]
        );
      }
      const uploadedResponse = await cloudinary.uploader.upload(profilePic);
      profilePic = uploadedResponse.secure_url;
    } else {
      // If no new profile picture is provided, retain the existing one
      profilePic = user.profilePic;
    }

    // Update user fields with provided data or retain existing values if not provided
    user.username = username || user.username;
    user.name = name || user.name;
    user.email = email || user.email;
    user.profilePic = profilePic; // Update profilePic with the new or existing value
    user.bio = bio || user.bio;

    await user.save(); // Save the user before sending the response

    await Post.updateMany(
      { "replies.userId": userId },
      {
        $set: {
          "replies.$[reply].username": user.username,
          "replies.$[reply].userProfilePic": user.profilePic,
        },
      },
      { arrayFilters: [{ "reply.userId": userId }] }
    );
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Occurred error: " + error.message);
  }
};

const getProfile = async (req, res) => {
  const { query } = req.params;
  // console.log("Received query:", query); // Debug log

  try {
    let user;

    // Check if query is a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(query)) {
      user = await User.findOne({ _id: query }).select("-password -email");
    } else {
      user = await User.findOne({ username: query }).select("-password -email");
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Occurred error:", error.message); // Debug log
    res.status(500).json({ error: error.message });
  }
};

const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.user._id; // Ensure req.user is correctly populated
    const usersFollowedByYou = await User.findById(userId).select("following");
    const users = await User.aggregate([
      { $match: { _id: { $ne: userId } } },
      { $sample: { size: 10 } },
    ]);
    const filteredUsers = users.filter(
      (user) => !usersFollowedByYou.following.includes(user._id)
    );
    const suggestedUsers = filteredUsers.slice(0, 4);
    suggestedUsers.forEach((user) => (user.password = null));
    res.status(200).json(suggestedUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Occurred error: " + error.message);
  }
};

export {
  signupUser,
  loginUser,
  logoutUser,
  followUnfollow,
  updateUser,
  getProfile,
  getSuggestedUsers,
};
