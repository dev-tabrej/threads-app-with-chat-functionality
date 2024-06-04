import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  createPost,
  deletePost,
  getPost,
  likeUnlikePost,
  repliesToPost,
  feedPosts,
} from "../controllers/postController.js";
const router = express.Router();

router.get("/getPost/:id", getPost);
router.get("/feed", protectRoute, feedPosts);
router.post("/create", protectRoute, createPost);
router.delete("/delete/:id", protectRoute, deletePost);

router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/reply/:id", protectRoute, repliesToPost);

export default router;
