const userService = require("../service/user.service");

const getMyWhiteboards = async (req, res, next) => {
  try {
    const whiteboards = await userService.getWhiteboards(req.user.id);

    res.status(200).json(whiteboards);
  } catch (e) {
    return next(e);
  }
};

const getMe = (req, res) => {
  res.status(200).json(req.user);
};

module.exports = {
  getMyWhiteboards,
  getMe,
};
