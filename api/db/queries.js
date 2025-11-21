const { PrismaClient } = require("@prisma/client");
const CustomNotFoundError = require("../middlewares/CustomNotFoundError");
const prisma = new PrismaClient();

exports.createUser = async (username, password) => {
  await prisma.user.create({
    data: {
      username: username,
      password: password,
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

  if (!posts || posts.length === 0) {
    throw new CustomNotFoundError("No posts found");
  }
  res.status(200).json(posts);
};
