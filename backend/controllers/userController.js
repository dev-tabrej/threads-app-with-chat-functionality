import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import generateTokenAndSetCookie from "./utils/helper/generateTokenAndSetCookie.js";
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
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "user logged out" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("occured error: " + error.message);
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
  console.log(userId);
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

    // if (profilePic) {
    //   if (user.profilePic) {
    //     await cloudinary.uploader.destroy(
    //       user.profilePic.split("/").pop().split(".")[0]
    //     );
    //   }
    //   const uploadedResponse = await cloudinary.uploader.upload(profilePic);
    //   profilePic = uploadedResponse.secure_url;
    // }

    user.username = username || user.username;
    user.name = name || user.name;
    user.email = email || user.email;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    await user.save(); // Save the user before sending the response
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Occurred error: " + error.message);
  }
};

const getProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username })
      .select("-password")
      .select("-email");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("occured error: " + error.message);
  }
};
export {
  signupUser,
  loginUser,
  logoutUser,
  followUnfollow,
  updateUser,
  getProfile,
};
