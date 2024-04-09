const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated.middleware");
const authRouter = require("./auth.route");
const userRouter = require("./user.route");
const whiteboardRouter = require("./whiteboard.route");

router.use("/auth", authRouter);
router.use("/user", isAuthenticated, userRouter);
router.use("/whiteboard", isAuthenticated, whiteboardRouter);

module.exports = router;
