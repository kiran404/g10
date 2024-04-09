const prisma = require("../configs/db");

const getMyWhiteboards = async (userId) => {
  return await prisma.whiteboard.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      name: true,
      drawings: false,
    },
  });
};

const getById = async (id) => {
  return await prisma.whiteboard.findUnique({
    where: { id },
  });
};

const addNewWhiteboard = async (data) => {
  return await prisma.whiteboard.create({
    data,
  });
};

const updateWhiteboard = async (id, data) => {
  await prisma.whiteboard.update({
    where: {
      id,
    },
    data,
  });
  return true;
};

module.exports = {
  getMyWhiteboards,
  getById,
  addNewWhiteboard,
  updateWhiteboard,
};
