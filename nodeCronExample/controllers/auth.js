const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const subscriber = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    res.status(StatusCodes.CREATED).json({
      message: "Created",
      data: user,
    });
  } catch (error) {
    let customError = {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      msg: "Something went wrong",
    };
    if (error.name === "ValidationError") {
      customError.msg = Object.values(error.errors)
        .map((item) => {
          return item.message;
        })
        .join(", ");
      customError.code = StatusCodes.NOT_FOUND;
    }

    res.status(customError.statusCode).json({ message: customError.msg });
  }
};

module.exports = {
  subscriber,
};
