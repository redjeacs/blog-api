const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createUser = async (username, password, isAuthor = false) => {
  await prisma.user.create({
    data: {
      username: username,
      password: password,
      isAuthor: isAuthor,
    },
  });
};

exports.getUser = async (colName, query) => {
  const key = { [colName]: query };
  const user = await prisma.user.findUnique({
    where: key,
    include: {
      posts: true,
      comments: true,
    },
  });
  return user;
};

exports.getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};

exports.getPost = async (colName, query) => {
  const key = { [colName]: query };
  const post = await prisma.post.findUnique({
    where: key,
    include: {
      comments: true,
      user: true,
    },
  });
  return post;
};

exports.createPost = async (
  userId,
  title,
  content,
  img,
  isPublished = false
) => {
  await prisma.post.create({
    data: {
      title: title,
      content: content,
      img: img,
      isPublished: isPublished,
      user: {
        connect: { id: userId },
      },
    },
  });
};

exports.createComment = async (userId, postId, text) => {
  await prisma.comment.create({
    data: {
      text: text,
      user: {
        connect: { id: userId },
      },
      post: {
        connect: { id: postId },
      },
    },
  });
};
