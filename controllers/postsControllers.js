import prisma from "../config/db.js";
/**
 * @openapi
 * /posts:
 *   get:
 *     summary: Get all posts
 *     parameters:
 *       - in: query
 *         name: term
 *         schema:
 *           type: string
 *         description: Search term to filter posts by title, content or category
 *     responses:
 *       200:
 *         description: List of all posts
 */
export const getAllBlogs = async (req, res) => {
  if (!req.query.term) {
    const posts = await prisma.blog.findMany();
    res.status(200).json(posts);
  } else {
    const term = req.query.term;
    const posts = await prisma.blog.findMany({
      where: {
        OR: [
          { title: { contains: term, mode: "insensitive" } },
          { content: { contains: term, mode: "insensitive" } },
          { category: { contains: term, mode: "insensitive" } },
        ],
      },
    });
    res.status(200).json(posts);
  }
};

/**
 * @openapi
 * /posts/{id}:
 *   get:
 *     summary: Get a single post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The post
 *       404:
 *         description: Post not found
 */
export const getBlog = async (req, res) => {
  const id = parseInt(req.params.id);
  const post = await prisma.blog.findUnique({
    where: { id: id },
  });
  if (!post) return res.status(404).json({ error: "This blog isn't found!" });
  res.status(200).json(post);
};

/**
 * @openapi
 * /posts:
 *   post:
 *     summary: Create a new post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content, category, tags]
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Post created
 *       400:
 *         description: Missing required fields
 */
export const postBlog = async (req, res) => {
  const { title, content, category, tags } = req.body;
  if (!title || !content || !category || !tags) {
    return res.status(400).json({
      error:
        "please provide valid request data (title, content, category, tags)",
    });
  }
  const post = await prisma.blog.create({
    data: { title, content, category, tags },
  });
  res.status(201).json(post);
};

/**
 * @openapi
 * /posts/{id}:
 *   put:
 *     summary: Update a post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content, category, tags]
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Post updated
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Post not found
 */
export const updateBlog = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, category, tags } = req.body;
  if (!title || !content || !category || !tags) {
    return res.status(400).json({
      error:
        "please provide valid request data (title, content, category, tags)",
    });
  }

  try {
    const post = await prisma.blog.update({
      where: { id: id },
      data: { title, content, category, tags },
    });
    res.status(200).json(post);
  } catch (e) {
    if (e.code === "P2025")
      return res.status(404).json({ error: "this post isn't found!" });
    throw e;
  }
};

/**
 * @openapi
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Post deleted
 *       404:
 *         description: Post not found
 */
export const deleteBlog = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.blog.delete({
      where: { id: id },
    });
    res.status(204).send();
  } catch (e) {
    if (e.code === "P2025")
      return res.status(404).json({ error: "this post isn't found!" });
    throw e;
  }
};
