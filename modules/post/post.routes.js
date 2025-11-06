import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getSinglePost,
  updatePost,
} from "./post.controller.js";

const postRouter = express.Router();

postRouter.post("/", createPost);
postRouter.put("/:id", updatePost);
postRouter.delete("/:id", deletePost);
postRouter.get("/", getAllPosts);
postRouter.get("/:id", getSinglePost);

export default postRouter;
