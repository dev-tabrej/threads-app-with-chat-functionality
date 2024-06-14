import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  createPost,
  deletePost,
  getPost,
  likeUnlikePost,
  repliesToPost,
  feedPosts,
  getUserPosts,
} from "../controllers/postController.js";
const router = express.Router();

router.get("/getpost/:id", getPost);
router.get("/feed", protectRoute, feedPosts);
router.post("/create", protectRoute, createPost);
router.delete("/delete/:id", protectRoute, deletePost);

router.get("/user/:username", protectRoute, getUserPosts);
router.put("/like/:id", protectRoute, likeUnlikePost);
router.put("/reply/:id", protectRoute, repliesToPost);

export default router;
