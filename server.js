import "dotenv/config";
import express from "express";
import postsRouter from "./routes/posts.js";

import prisma from "./config/db.js";

const app = express();

app.use(express.json());
app.use("/posts", postsRouter);

app.listen(3000);
