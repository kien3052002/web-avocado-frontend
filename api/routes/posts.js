import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
  reactPost,
  getReact,
  getMyPosts,
} from "../controllers/postsController.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/myPosts", getMyPosts);
router.get("/:id", getPost);
router.get("/reaction/:id/:uid", getReact);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);
router.post("/react/:id/:uid", reactPost);

export default router;
