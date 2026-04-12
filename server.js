import "dotenv/config";
import express from "express";
import postsRouter from "./routes/posts.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

import prisma from "./config/db.js";

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use("/posts", postsRouter);

app.listen(3000);
