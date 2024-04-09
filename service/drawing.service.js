const prisma = require("../configs/db");

const getById = async (id) => {
  return await prisma.drawing.findUnique({
    where: { id },
  });
};

const addDrawing = async (data) => {
  console.log("Drawing service");
  return await prisma.drawing.create({
    data,
  });
};

const getDrawingsByWhiteboardId = async (wId) => {
  console.log("wwwwwwwwww serv id", wId);
  return await prisma.drawing.findMany({
    where: {
      whiteboardId: wId,
    },
  });
};

module.exports = {
  getById,
  addDrawing,
  getDrawingsByWhiteboardId,
};
