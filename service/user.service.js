const prisma = require("../configs/db");

const getAll = async () => {
  return await prisma.user.findMany();
};

const getWhiteboards = async (userId) => {
  const { whiteboards } = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      whiteboards: true,
    },
  });

  return whiteboards;
};

module.exports = {
  getAll,
  getWhiteboards,
};
