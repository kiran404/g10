const router = require("express").Router();
const userController = require("../controller/user.controller");

router.get("/", userController.getMe);

module.exports = router;
