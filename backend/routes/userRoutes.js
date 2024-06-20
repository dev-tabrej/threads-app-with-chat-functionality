import express from "express";
import protectRoute from "./../middlewares/protectRoute.js";

import {
  loginUser,
  signupUser,
  logoutUser,
  followUnfollow,
  updateUser,
  getProfile,
  getSuggestedUsers,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/signup", signupUser);
router.post("/loginUser", loginUser);
router.post("/logoutUser", logoutUser);
router.post("/follow/:id", protectRoute, followUnfollow);
router.put("/update/:id", protectRoute, updateUser);
router.get("/profile/:query", getProfile);
router.get("/suggested", protectRoute, getSuggestedUsers);
// router.post("/loginUser", loginUser);

export default router;
