import express from "express";
import {
  getAllBlogs,
  getBlog,
  postBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/postsControllers.js";

const postsRouter = express.Router();

postsRouter.get("/", getAllBlogs).post("/", postBlog);
postsRouter
  .get("/:id", getBlog)
  .put("/:id", updateBlog)
  .delete("/:id", deleteBlog);
export default postsRouter;
