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
    include: {
      comments: true,
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
    },
  });
};

exports.createPost = async (
  userId,
  title,
  content,
  img,
  isPublished = false
) => {
  console.log(isPublished);
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
