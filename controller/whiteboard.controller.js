const whiteBoardService = require("../service/whiteboard.service");

const getById = async (req, res, next) => {
  try {
    const whiteboardId = req.params.id;
    const whiteboard = await whiteBoardService.getById(whiteboardId);
    if (!whiteboard) {
      return res.status(404).json({
        err: "Whiteboard not found",
      });
    }
    res.status(200).json(whiteboard);
  } catch (err) {
    return next(err);
  }
};

const addWhiteboard = async (req, res, next) => {
  try {
    const whiteboard = {
      name: req.body.name,
      notes: req.body.notes,
      // image: req.file.path,
      updatedAt: new Date(),
      user: {
        connect: { id: req.user.id },
      },
    };
    const whiteboards = await whiteBoardService.addNewWhiteboard(whiteboard);
    res.status(200).json(whiteboards);
  } catch (e) {
    return next(e);
  }
};

const update = async (req, res, next) => {
  try {
    var isWhiteboardExist = await whiteBoardService.getById(req.params.id);
    if (!isWhiteboardExist) {
      return res.status(400).json(false);
    }
    const whiteboard = {
      name: req.body.name ? req.body.name : isWhiteboardExist.name,
      notes: req.body.notes ? req.body.notes : isWhiteboardExist.notes,
      // image: req.file.path ? req.file.path : isWhiteboardExist.image,
    };

    var data = await whiteBoardService.updateWhiteboard(
      req.params.id,
      whiteboard
    );
    res.status(200).json(data);
  } catch (e) {
    return next(e);
  }
};

const getMyWhiteboards = async (req, res, next) => {
  try {
    const whiteboards = await whiteBoardService.getMyWhiteboards(req.user.id);
    res.status(200).json(whiteboards);
  } catch (e) {
    return next(e);
  }
};

// delete whitboard

module.exports = {
  getById,
  addWhiteboard,
  update,
  getMyWhiteboards,
};
