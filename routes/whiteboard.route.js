const router = require("express").Router();
const whiteboardController = require("../controller/whiteboard.controller");
const upload = require("./../service/upload.service");

router.get("/", whiteboardController.getMyWhiteboards);
router.post("/", whiteboardController.addWhiteboard);
// router.post("/", upload.single("image"), whiteboardController.addWhiteboard);
router.get("/:id", whiteboardController.getById);
router.put("/:id", whiteboardController.update);
// router.put("/:id", upload.single("image"), whiteboardController.update);

module.exports = router;
