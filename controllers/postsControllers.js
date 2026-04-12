import prisma from "../config/db.js";

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

export const getBlog = async (req, res) => {
  const id = parseInt(req.params.id);
  const post = await prisma.blog.findUnique({
    where: { id: id },
  });
  if (!post) return res.status(404).json({ error: "This blog isn't found!" });
  res.status(200).json(post);
};

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
