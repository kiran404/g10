const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated.middleware");

router.use("/auth", require("./auth.route")); //login register
router.use("/user", isAuthenticated, require("./user.route"));
router.use("/whiteboard", isAuthenticated, require("./whiteboard.route"));

module.exports = router;
