import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";

var cors = require('cors');
const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

// get method to signup, gotta problems with "post" method
app.get(`/signup/:email/:name/:posts`, async (req, res) => {
  const { email, name, posts } = req.params;
  const post = { title: posts };
  const user = await prisma.user.create({
    data: {
      email,
      name,
      posts: {
        create: post,
      },
    },
  });
  res.json(user);
});

// post method to create comment
app.post(`/post`, async (req, res) => {
  const { title, content, authorEmail } = req.body
  const result = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { email: authorEmail } },
    },
  })
  res.json(result)
})

// updating or creating a new facility
app.put("/post/:id/views", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    res.json(post);
  } catch (error) {
    res.json({ error: `Post with ID ${id} does not exist in the database` });
  }
});


// delete comment
app.delete(`/post/:id`, async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(post);
});


// get all users
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// get all posts
app.get("/user/:id/drafts", async (req, res) => {
  const { id } = req.params;

  const drafts = await prisma.user
    .findUnique({
      where: {
        id: Number(id),
      },
    })
    .posts({
      where: { published: false },
    });

  res.json(drafts);
});


// get post by id
app.get(`/post/:id`, async (req, res) => {
  const { id }: { id?: string } = req.params;

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });
  res.json(post);
});


const server = app.listen(8080, () =>
  console.log(`
🚀 Server ready at: http://localhost:8080
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);
