import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(403).json({ error: "No token provided" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded.userId);
    const user = await User.findById(decoded.userId).select("-password");
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error: " + error.message);
  }
};

export default protectRoute;
