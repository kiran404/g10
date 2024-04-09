const addDrawing = async (req, res, next) => {
  console.log("From Drawing");
  try {
    const drawing = {
      type: req.body.type,
      data: JSON.stringify(req.body.data),
      color: req.body.color,
      thickness: parseInt(req.body.thickness),
      createdAt: new Date(),
      whiteboard: { connect: { id: req.params.id } },
    };

    const drawings = await drawingService.addDrawing(drawing);
    res.status(200).json(drawings);
  } catch (e) {
    return next(e);
  }
};

// Get all the drawings of a specific WhiteBoard

const getDrawingsByWhiteBoardId = async (req, res, next) => {
  try {
    console.log("wid in controller", req.params.whiteboardId);
    const whiteboardId = req.params.whiteboardId;
    const drawings = await drawingService.getDrawingsByWhiteboardId(
      whiteboardId
    );
    if (!drawings) {
      return res.status(404).json({
        err: "Drawings not found",
      });
    }
    res.status(200).json(drawings);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  addDrawing,
  getDrawingsByWhiteBoardId,
};
