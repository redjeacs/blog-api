const { PrismaClient } = require("@prisma/client");
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
